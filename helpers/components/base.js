import { Tokenizer, evalToken } from "liquidjs";

// Much of this file is based on the implementation of `addPairedShortcode`,
// licensed under the terms:
//
// Copyright (c) 2017–2024 Zach Leatherman @zachleat
//
// Permission is hereby granted, free of charge, to any person obtaining a copy
// of this software and associated documentation files (the "Software"), to deal
// in the Software without restriction, including without limitation the rights
// to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
// copies of the Software, and to permit persons to whom the Software is
// furnished to do so, subject to the following conditions:
//
// The above copyright notice and this permission notice shall be included in all
// copies or substantial portions of the Software.
//
// THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
// IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
// FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
// AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
// LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
// OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE
// SOFTWARE.

function parseArgumentsBuiltin(args) {
  let tokenizer = new Tokenizer(args);
  let parsedArgs = [];

  function readValue() {
    let value = tokenizer.readHash() ?? tokenizer.readValue();
    // readHash() treats unmarked identifiers as hash keys with undefined
    // values, but we want to parse them as positional arguments instead.
    if (value?.kind === 64 && value.value === undefined) value = value.name;
    return value;
  }

  let value = readValue();
  while (value) {
    parsedArgs.push(value);
    tokenizer.skipBlank();
    if (tokenizer.peek() === ",") {
      tokenizer.advance();
    }
    value = readValue();
  }
  tokenizer.end();

  return parsedArgs;
}

/**
 * This works just like `createPairedShortcode`, except:
 *
 * * It returns a plugin function that takes an `eleventyConfig` object.
 * * The first argument to {@link shortcodeFn} is the liquid engine, which can
 *   be used to render the component's template.
 */
export function createPairedComponentPlugin(shortcodeName, shortcodeFn) {
  return function (eleventyConfig) {
    eleventyConfig.addLiquidTag(shortcodeName, function (liquidEngine) {
      return {
        parse(tagToken, remainTokens) {
          this.name = tagToken.name;

          this.orderedArgs = parseArgumentsBuiltin(tagToken.args);
          this.templates = [];

          var stream = liquidEngine.parser
            .parseStream(remainTokens)
            .on("template", (tpl) => this.templates.push(tpl))
            .on("tag:end" + shortcodeName, () => stream.stop())
            .on("end", () => {
              throw new Error(`tag ${tagToken.raw} not closed`);
            });

          stream.start();
        },
        render: function* (ctx /*, emitter*/) {
          let argArray = [];
          let namedArgs = {};
          if (this.orderedArgs) {
            for (let arg of this.orderedArgs) {
              if (arg.kind == 64) {
                if (arg.value === undefined) {
                  namedArgs[arg.name.content] = true;
                } else {
                  namedArgs[arg.name.content] = yield evalToken(arg.value, ctx);
                }
              } else {
                let b = yield evalToken(arg, ctx);
                argArray.push(b);
              }
            }
          }

          const html = yield liquidEngine.renderer.renderTemplates(
            this.templates,
            ctx,
          );

          let ret = yield shortcodeFn.call(
            ctx,
            liquidEngine,
            html,
            ...argArray,
            namedArgs,
          );

          return ret;
        },
      };
    });
  };
}
