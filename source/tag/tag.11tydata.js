export const pagination = {
  data: "collections",
  alias: "posts",
  size: 1,
  addAllPagesToCollections: true,
  before: function (collections, data) {
    const results = [];
    let tagIndex = 0;
    for (const tag of collections) {
      if (tag === "blog" || tag === "all") continue;

      const posts = data.collections[tag].toSorted(
        (post1, post2) => post2.page.date - post1.page.date,
      );
      const postsPerPage = 10;
      const tagResults = [];
      for (let i = 0; i < posts.length; i += postsPerPage) {
        const pageIndex = Math.floor(i / postsPerPage);
        tagResults.push({
          eleventyPaginationGroupNumber: tagIndex,
          tag,
          slug: i === 0 ? "/" : `/${pageIndex}/`,
          pagination: {
            pageNumber: pageIndex,
            pages: Math.ceil(posts.length / postsPerPage),
            href: {
              previous:
                pageIndex === 0
                  ? undefined
                  : pageIndex === 1
                    ? ".."
                    : `../${pageIndex - 1}`,
              next:
                i + postsPerPage >= posts.length
                  ? undefined
                  : pageIndex === 0
                    ? "1"
                    : `../${pageIndex + 1}`,
            },
          },
          posts: posts.slice(i, i + postsPerPage),
        });
      }

      for (const result of tagResults) {
        result.pagination.pages = tagResults;
      }
      results.push(...tagResults);

      tagIndex++;
    }

    return results;
  },
};
