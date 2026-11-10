import * as cheerio from "cheerio";
import fetch from "node-fetch";
import * as prettier from "prettier";

import * as dates from "../../helpers/dates.js";

export async function backloggdTag(url) {
  // const reviewResponse = await fetch(url);
  const $ = cheerio.load(`
<!DOCTYPE html>
<html>
	<head>
			
		<title>nex3&#39;s review of Big Walk | Backloggd</title>

		<!-- HTML Meta Tags -->
			<meta name="description" content="Yesterday it came out that Big Walk used LLMs in its development. In House House&#39;s response (archived here), they stated that the use was small and largely consultative rather than generative, although some amount of LLM-generated code was used as the basis for code that shipped. &amp;gt; Big Walk wa...">

			<!-- Google / Search Engine Tags -->
			<meta itemprop="name" content="nex3&#39;s review of Big Walk | Backloggd">
			<meta itemprop="description" content="Yesterday it came out that Big Walk used LLMs in its development. In House House&#39;s response (archived here), they stated that the use was small and largely consultative rather than generative, although some amount of LLM-generated code was used as the basis for code that shipped. &amp;gt; Big Walk wa...">
			<meta itemprop="image" content="https://images.igdb.com/igdb/image/upload/t_1080p/scpuym.jpg">

			<!-- Facebook Meta Tags -->
			<meta property="og:url" content="https://www.backloggd.com">
			<meta property="og:type" content="website">
			<meta property="og:title" content="nex3&#39;s review of Big Walk | Backloggd">
			<meta property="og:description" content="Yesterday it came out that Big Walk used LLMs in its development. In House House&#39;s response (archived here), they stated that the use was small and largely consultative rather than generative, although some amount of LLM-generated code was used as the basis for code that shipped. &amp;gt; Big Walk wa...">
			<meta property="og:image" content="https://images.igdb.com/igdb/image/upload/t_1080p/scpuym.jpg">

			<!-- Twitter Meta Tags -->
			<meta name="twitter:card" content="summary_large_image">
			<meta name="twitter:title" content="nex3&#39;s review of Big Walk | Backloggd">
			<meta name="twitter:description" content="Yesterday it came out that Big Walk used LLMs in its development. In House House&#39;s response (archived here), they stated that the use was small and largely consultative rather than generative, although some amount of LLM-generated code was used as the basis for code that shipped. &amp;gt; Big Walk wa...">
			<meta name="twitter:image" content="https://images.igdb.com/igdb/image/upload/t_1080p/scpuym.jpg">

			<!-- Meta Tags Generated via http://heymeta.com -->
		
		<meta name="csrf-param" content="authenticity_token" />
<meta name="csrf-token" content="FA2tnZbe7P8o8c3YDsv3CPREsk9DWxQRMvuL4EM6udProxDpiBh5reBR-1G1F8nU_g_Ll4k_DlE_ZwYxrHv7mg" />
			<meta name="viewport" content="width=device-width, initial-scale=1, viewport-fit=cover">
		<meta name="google-site-verification" content="xlWrQJ4YzVwdsRQ9-Asux-nkCT1gYdCAvOxfOsq0ARE" />
		<link rel="preconnect" href="https://backloggd.b-cdn.net" crossorigin>
		<link rel="preload" href="https://backloggd.b-cdn.net/fonts/roboto/v1/roboto-latin.woff2" as="font" type="font/woff2" crossorigin>
			<link href="https://backloggd.b-cdn.net/fonts/1.18.2/css/brands.min.css" rel="stylesheet">
			<link href="https://backloggd.b-cdn.net/fonts/1.18.2/css/custom-icons.min.css" rel="stylesheet">
			<link href="https://backloggd.b-cdn.net/fonts/1.18.2/css/duotone.min.css" rel="stylesheet">
			<link href="https://backloggd.b-cdn.net/fonts/1.18.2/css/fontawesome.min.css" rel="stylesheet">
			<link href="https://backloggd.b-cdn.net/fonts/1.18.2/css/light.min.css" rel="stylesheet">
			<link href="https://backloggd.b-cdn.net/fonts/1.18.2/css/regular.min.css" rel="stylesheet">
			<link href="https://backloggd.b-cdn.net/fonts/1.18.2/css/solid.min.css" rel="stylesheet">

		<script src="https://static.backloggd.com/assets/application-218646c8.js" crossorigin="anonymous" data-turbo-track="reload"></script>
		<link rel="stylesheet" crossorigin="anonymous" href="https://static.backloggd.com/assets/application-349da401.css" media="all" data-turbo-track="reload" />

		<meta name="turbo-prefetch" content="false">
		


		<!-- Global site tag (gtag.js) - Google Analytics -->
				<script>
					window.dataLayer = window.dataLayer || [];
					function gtag(){dataLayer.push(arguments);}

					gtag('consent', 'default', {
						'ad_storage': 'denied',
						'analytics_storage': 'denied',
						'ad_personalization': 'denied',
						'ad_user_data': 'denied',
						'wait_for_update': 500
					});
				</script>
			<script async src="https://www.googletagmanager.com/gtag/js?id=G-W5VPEML01P" data-turbo-track="reload"></script>

	</head>
	<body class="blur-adult     "
		data-authenticated="true" data-route="user#review">
		<div class="d-none" id="main-gradient"></div>
		<header>
			<nav class="navbar navbar-expand-md navbar-dark " id="primary-nav">
				<div class="container">
						<a class="navbar-brand mr-2 my-auto py-0" href="/">Backloggd</a>
					<ul class="navbar-nav ml-auto">
						<li class="nav-item mr-sm-2 d-inline d-md-none">
								<a class="nav-link d-inline mr-1 position-relative" id="nav-notification-bell" href="/notifications/"><i class="fa-solid fa-bell"></i><span class="notification-indicator"></span></a>
							<a class="nav-link d-inline mr-2" href="/games/lib/popular/">Games</a>
							<button class="navbar-toggler collapsed" type="button" data-toggle="collapse" data-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
								<span class="navbar-toggler-icon"></span>
							</button>
						</li>
					</ul>

					<div class="collapse navbar-collapse mt-2 mt-md-0" id="navbarSupportedContent">
						<ul class="navbar-nav ml-auto">
								<li class="nav-item d-none d-md-block">
									<a class="nav-link position-relative" id="nav-notification-bell" href="/notifications/"><i class="fa-solid fa-bell"></i><span class="notification-indicator"></span></a>
								</li>
								<li class="nav-item dropdown d-none d-md-block" id="profile-li">
									<a class="nav-link" href="#" id="navbarDropdown" role="button" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
										nex3 <i class="fa-solid fa-chevron-down fa-xs"></i>
									</a>
									<div class="dropdown-menu mt-0 py-0" aria-labelledby="navbarDropdown">
										<a class="dropdown-item py-1" href="/u/nex3/">Profile</a>
										<div class="dropdown-divider my-0"></div>
										<a class="dropdown-item py-1" href="/u/nex3/played/">
											Played
										</a>
										<a class="dropdown-item py-1" href="/u/nex3/playing/">
											Playing
										</a>
										<a class="dropdown-item py-1" href="/u/nex3/backlog/">
											Backlog
										</a>
										<a class="dropdown-item py-1" href="/u/nex3/wishlist/">
											Wishlist
										</a>
										<div class="dropdown-divider my-0"></div>
										<a class="dropdown-item py-1" href="/u/nex3/journal/">Journal</a>
										<a class="dropdown-item py-1" href="/u/nex3/activity/">Activity</a>
										<a class="dropdown-item py-1" href="/u/nex3/reviews/">Reviews</a>
										<a class="dropdown-item py-1" href="/u/nex3/lists/">Lists</a>
										<a class="dropdown-item py-1" href="/u/nex3/following/">Friends</a>
										<a class="dropdown-item py-1" href="/u/nex3/likes/">Likes</a>
											<a class="dropdown-item py-1" href="/u/nex3/stats/">Stats</a>
										<div class="dropdown-divider my-0"></div>
										<a class="dropdown-item py-1" href="/settings/">Settings</a>
										<a data-turbo-method="delete" class="dropdown-item pt-1 pb-2" rel="nofollow" data-method="delete" href="/users/sign_out/">Log Out</a>
									</div>
								</li>
								<li class="nav-item mr-sm-2 d-block d-md-none">
									<div class="row mx-0" id="mobile-user-nav">
										<div class="col-4 pr-1">
											<a class="nav-link" href="/u/nex3"><i class="fa-solid fa-user"></i> My Profile</a>
										</div>
										<div class="col-4 px-1">
											<a class="nav-link" href="/settings/"><i class="fa-solid fa-gears"></i> Settings</a>
										</div>
										<div class="col-4 pl-1">
											<a data-turbo-method="delete" class="nav-link" rel="nofollow" data-method="delete" href="/users/sign_out/">
												<i class="fa-solid fa-right-from-bracket"></i> Log Out
</a>										</div>
										<div class="col-3 pr-1">
											<a class="nav-link" href="/u/nex3/played/"><i class="fa-kit fa-gamepad-classic"></i><br> Played</a>
										</div>
										<div class="col-3 px-1">
											<a class="nav-link" href="/u/nex3/playing/"><i class="fa-solid fa-play"></i><br>  Playing</a>
										</div>
										<div class="col-3 px-1">
											<a class="nav-link" href="/u/nex3/backlog/"><i class="fa-kit fa-books-classic"></i><br> Backlog</a>
										</div>
										<div class="col-3 pl-1">
											<a class="nav-link" href="/u/nex3/wishlist/"><i class="fa-solid fa-gift"></i><br> Wishlist</a>
										</div>
										<div class="col-6 pr-1">
											<a class="nav-link" href="/u/nex3/journal/"><i class="fa-solid fa-book"></i> Journal</a>
										</div>
										<div class="col-6 pl-1">
											<a class="nav-link" href="/u/nex3/activity/"><i class="fa-solid fa-clock-rotate-left"></i> Activity</a>
										</div>
										<div class="col-4 pr-1">
											<a class="nav-link" href="/u/nex3/reviews/"><i class="fa-solid fa-align-right"></i> Reviews</a>
										</div>
										<div class="col-4 px-1">
											<a class="nav-link" href="/u/nex3/lists/"><i class="fa-solid fa-layer-group"></i> Lists</a>
										</div>
										<div class="col-4 pl-1">
											<a class="nav-link" href="/u/nex3/likes/"><i class="fa-solid fa-heart"></i> Likes</a>
										</div>
										<div class="col-6 pr-1">
											<a class="nav-link" href="/u/nex3/following/"><i class="fa-solid fa-user-group"></i> Following</a>
										</div>
										<div class="col-6 pl-1">
											<a class="nav-link" href="/u/nex3/followers/"><i class="fa-solid fa-user-group fa-flip-horizontal"></i> Followers</a>
										</div>
									</div>
								</li>
							<li class="nav-item d-none d-md-block mr-2">
								<a class="nav-link" href="/games/lib/popular/">Games</a>
							</li>
						</ul>
						<form class="form-inline mx-3 mx-md-0 my-2 my-md-0" data-turbo="false" action="/search" accept-charset="UTF-8" method="post"><input type="hidden" name="authenticity_token" value="fN3uNZu-IZ3OeGwyGwMI6-f2Gx-tJNsZP2OovpW0zVBT-m7z7wjj8BRI80TKBVMWjZs0-yyWlmuAEGU7Z337Gw" autocomplete="off" />
							<div class="input-group">
								<input class="form-control border-right-0 search-bar" id="nav-bar-search" type="search" placeholder="Search" aria-label="Search" name="query" autocomplete="off" data-behavior="autocomplete">
								<span class="input-group-append mr-md-2">
									 <button class="btn border-left-0 pl-1 pr-2 search-btn" type="submit">
									 	<i class="fa-solid fa-magnifying-glass"></i>
									 </button>
								</span>
							</div>
</form>						<div class="row mx-0 mb-2 mb-md-0">
							<div class="col my-auto px-0 mx-3 mx-md-0">
									<button class="btn btn-main mb-2 my-sm-0 py-0" id="add-a-game" type="submit" data-toggle="modal" data-target="#add-a-game-modal"><i class="fa-solid fa-plus fa-xs"></i> Log a Game</button>
							</div>
						</div>
					</div>
				</div>
			</nav>
		</header>

		<main role="main" class="main">
			<div class="container">
				<div class="row mt-3" id="review-sidebar">
	<div class="col col-12 col-md-cus-4 col-lg-cus-5 col-xl-cus-6">
		<div class="row">
			<div class="col-6 col-md-12 mx-auto">
				<a href="/games/big-walk/">
<div class="card mx-auto game-cover overlay-hide" game_id="279624" >
	<div class="overflow-wrapper">
				<img class="card-img height" src="https://images.igdb.com/igdb/image/upload/t_cover_big/co7h9m.jpg" alt="Big Walk">
		<div class="overlay"></div>
	</div>
</div>


</a>
			</div>
		</div>
			<div class="row mt-1 mb-3" id="review-social-links">
				<div class="col-auto ml-auto pr-1 my-auto">
					<p class="text-center mb-0 subtitle-text">Share</p>
				</div>
				<div class="col-auto px-1 my-auto">
					<a target="_blank" href="https://bsky.app/intent/compose?text=My ★★★ review of Big%20Walk (2026) on %40backloggd.com : Yesterday [it came out](https://www.resetera.com/threads/indie-darling-of-the-year-big-walk-used-ai-for-consultation-during-development-disclosed-to-igf-judges.1683377/) that *Big Walk* used LLMs in its developm... https://bckl.gg/xUDg"><i class="fa-brands fa-bluesky"></i></a>
				</div>
				<div class="col-auto mr-auto pl-1 my-auto">
					<button class="btn btn-link manual-tooltip short-url" short_url="https://bckl.gg/xUDg"><i class="fa-solid fa-link fa-xs"></i></button>
				</div>
			</div>
		<div class="row ">
				<div class="col col-md-12 pr-1 pr-md-3">
					<button class="w-100 text-center btn btn-general btn-md-small open-log mb-2" playthrough_id="47707328" game_id="279624"><i class="fa-solid fa-pencil-line"></i> Edit Review</button>
				</div>
			<div class="col col-md-12 pl-1 pl-md-3">
				<a class="btn btn-general-outline w-100" href="/u/nex3/logs/big-walk/"><i class="fa-solid fa-list-timeline"></i> Log history</a>
			</div>
		</div>
	</div>
	<div class="col-12 col-md">
		
<div class="row pt-2 pb-1 review-card">
	<div class="col">
		<div class="row">
				<div class="col-auto mb-auto pr-0" id="avatar">
					<a href="/u/nex3/" data-turbo-frame="_top">
	            		<img src="https://backloggd-s3.b-cdn.net/2j9blnwf0mj133jjz8stjiy65tgl?optimizer=image&amp;quality=25" />
	            	</a>
		        </div>
			<div class="col">
					<div class="row top-bar mb-1 review-details">
				        <div class="col">
				        	<div class="row mb-1">
					        		<a class="mb-0 my-auto d-flex" href="/u/nex3/" data-turbo-frame="_top">
						        		<div class="col-auto my-auto username-link pr-0 mr-n2">
								    		<p class="mb-0">nex3</p>
									    </div>
									    <div class="col-auto my-auto px-0 ml-2 mr-n2">
										    		<p class="name-badge backer-badge ">BACKER</p>
  
									    </div>
								    </a>
									    <div class="col-auto mt-auto pr-1">
									    		<p class="mb-0 filler-text">reviewed <a href="/games/big-walk/" class="review-game-link" data-turbo-frame="_top"><span class="review-game-name">Big Walk</span></a></p>
									    </div>
				        	</div>
				        	<div class="row mx-0">
										<div class="col-auto my-auto pl-0 pr-1 ">
									    	
<div class="row star-ratings-static">
    <div class="stars-top" style="width:60%">
        <span class="star"></span><span class="star"></span><span class="star"></span><span class="star"></span><span class="star"></span>
    </div>
    <div class="stars-bottom">
        <span class="star"></span><span class="star"></span><span class="star"></span><span class="star"></span><span class="star"></span>
    </div>
</div>

									    </div>
									    <div class="col-auto my-auto pl-0 pr-1">
									    	<i class="game-liked fa-solid fa-heart top-tooltip" data-tippy-content="nex3 liked this game"></i>
									    </div>
							    <div class="col-auto my-auto game-status ml-2 pl-2 pr-1">
								    	<a class="d-contents" href=/u/nex3/games/added/game_status:completed/ data-turbo-frame="_top">
								    		<div class="status-color-indicator play-type-bkg completed"></div>
											<p class="mb-0 play-type completed">Completed</p>
								    	</a>
							    </div>
									<div class="col-12 col-sm-auto mt-1 mt-sm-0 d-sm-none">
									</div>
							    	<div class="col-auto my-auto pl-0 pr-1 filler-text">
							    		<p class="mb-0">on</p>
							    	</div>
									<div class="col-auto my-auto pl-0 pr-1">
							    		<a class="my-0 ml-auto review-platform" href="/u/nex3/games/added/played_platform:win/" data-turbo-frame="_top"><p class="mb-0">Windows PC</p></a>
									</div>
									<div class="col-auto my-auto px-0 filler-text">
							    		<p class="mb-0">again <i class="fa-regular fa-arrow-rotate-left fa-sm"></i></p>
							    	</div>
				        	</div>
				        </div>
					</div>
				<div class="row mt-2 mb-3 review-body " review_id="5546499">
					<div class="col">
						<div class="position-relative">
							<div class=" mb-0 card-text" id="collapseReview5546499">
								Yesterday <a rel="nofollow ugc" target="_blank" href="https://www.resetera.com/threads/indie-darling-of-the-year-big-walk-used-ai-for-consultation-during-development-disclosed-to-igf-judges.1683377/">it came out</a> that <em>Big Walk</em> used LLMs in its development. In <a rel="nofollow ugc" target="_blank" href="https://bigwalk.game/faq/#ai">House House's response</a> (<a rel="nofollow ugc" target="_blank" href="https://web.archive.org/web/20261110064927/https://bigwalk.game/faq/#ai">archived here</a>), they stated that the use was small and largely consultative rather than generative, although some amount of LLM-generated code was used as the basis for code that shipped.<br><br>&gt; <em>Big Walk</em> was developed without an internal AI usage policy in place, and we consider that lack of policy a failure. We will work to have a more comprehensive policy going forwards.<br><br>Reading between the lines, this final paragraph suggests that LLM usage was not a matter of company policy but rather one or a few engineers making individual decisions about their workflows. It also <u>implies</u> that they will institute a policy against this in the future, but leaves open the possibility that the policy they settle on will allow some amount of LLM usage.<br><br>I'm sure there's a tremendous amount of bickering about this happening on social media; I'm no longer in that particular torment nexus, so I don't know the details. I do know that this news will affect how I think about <em>Big Walk</em> going forward, so I think it's worth taking the time to revise my review and describe how and why my feelings have changed. In doing so, I hope to articulate my position on LLM usage more broadly.<br><br>I loved my time with <em>Big Walk</em>. I don't hand out five-star reviews lightly, but I was confident this game would earn one as soon as I began to understand just how cleverly it created new forms of play and puzzle solving between friends. It was clearly a work of masterful artistry, painted with the palette of real human interaction which is tremendously difficult to master but intensely rewarding to experience. That artistry was real, and it is still present regardless of the tools used.<br><br>At the same time, no piece of art exists in isolation. All art is in conversation with the culture that created it, with the art that surrounded and preceded it, with the economic conditions under which it was produced. If history is driven by material contradictions, as Marx and Engels taught, then we can expect to see aspects of that contradictory tension in the artifacts produced during that history. Within <em>Big Walk</em>, an artifact of impressive artistry, we see the use of a tool whose very existence is inimical to art as a discipline, a tool built from the work of artists and craftspeople over their vehement objections, a tool whose creators depend on the immiseration of workers for their own success, a tool whose effects on the physical world are profoundly detrimental.<br><br>Knowing that LLMs were used doesn't remove the artistry from <em>Big Walk</em>, but it changes everything about its conversation with the culture around it. <em>Big Walk</em> is now, indelibly, in some part an attack on the artistry of all the games that came before it and on the very possibility of all the games that could come after. Even House House's response gestures at this:<br><br>&gt; We have some concern that voluntary disclosures like this might contribute to the normalisation of this technology, or its treatment as “inevitable”. We support the work of those who are trying to limit the harm generative AI is doing to videogames and our world, and apologise that <em>Big Walk</em>’s LLM usage may not meet their standards.<br><br>Of course, the best way not to contribute to the normalization of LLMs is <em>not to use them at all</em>. But I suspect by the time any discussions were being had at a company-wide level, the horses had fled the stable and locking the door would do no good. I truly do not envy them the position of knowing people would view all their work as tainted by a few decisions made in the heat of debugging, and that there was no real way to undo the results of those decisions.<br><br>Some may sympathize so much with this dilemma that they take it as a sign that people are speaking out too harshly against LLMs. I could not disagree more with this position. On the contrary, we must do everything we can to make the use of LLMs culturally radioactive, such <em>any</em> use in a cultural product is treated as putting that product in conflict with human culture as a whole. It doesn't need to be black or white—we can acknowledge that <em>Big Walk</em> is far less in conflict than in the mountains of steamslop that continue to pile up around us—but we need to be clear that the only amount of LLM use that's truly acceptable is none. While we can grant some grace to those who don't yet realize that <a rel="nofollow ugc" target="_blank" href="https://azhdarchid.com/there-are-sides/">this is a conflict and there are sides</a>, we must in the final accounting recognize that works on the wrong side do real harm that we cannot paper over.<br><br>In most of the world today, the people don't exercise political power. Good work is being done to try and change that, but it will not change tomorrow nor will it change next year. But we can exercise power through culture because, despite capitalist attempts to capture it completely, part of culture <em>is</em> the people. When enough of us speak in one voice and say "this is not what we want art to be", the world will listen.
							</div>
						</div>
					</div>
				</div>
				<div class="row review-bottom-bar">
						<div class="col-auto mt-auto fav-review pr-1" id="like_5546499">
									<p class="d-inline-block my-auto"><i class="fa-solid fa-heart liked m-auto"></i></p>
									<p class="mb-0 d-inline-block like-counter" model="review" model_id="5546499"><a href="/u/nex3/review/5546499/likes/" data-turbo-frame="_top">1 Like</a></p>
						</div>
					<div class="col-auto my-auto ml-auto expand-review-col " review_id="5546499">
						<a class="d-none review-more" data-toggle="collapse" href="#collapseReview5546499" aria-expanded="false" aria-controls="collapseReview5546499"><i class="fa-solid fa-angle-down"></i></a>
					</div>
						<div class="col-auto ml-auto">
							<p class="mb-0 subtitle-text">Reviewed on <time datetime="2026-11-10T09:41:02Z" class="local-time-tooltip" data-local="time" data-format="%b %d, %Y">Nov 10, 2026</time></p>
						</div>
				</div>
			</div>
		</div>
			<hr>
	</div>
</div>

			<div class="row">
				<div class="col">
					<textarea name="comment_body" id="comment_body" rows="3" placeholder="Leave a comment" class="p-2 w-100 backloggd-field comment-field">
</textarea>
				</div>
			</div>
			<div class="row">
					<div class="col-auto">
						<ul class="nav col-auto mt-auto title-dropdown pr-2" id="nav-interactables">
							<button class="btn-sort btn btn-sm dropdown-toggle py-0 px-1" type="button" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
								<span  id="comment-privacy-button-text">Default privacy</span> <i class="fa-solid fa-chevron-down fa-xs"></i>
							</button>
							<div class="dropdown-menu dropdown-sort" id="comment-privacy-dropdown">
									<li class="nav-item">
									    <a model_type="review" model_id="5546499" privacy="" class="nav-link current-sort">Default privacy</a>
									</li>
									<li class="nav-item">
									    <a model_type="review" model_id="5546499" privacy="0" class="nav-link">Anyone can comment</a>
									</li>
									<li class="nav-item">
									    <a model_type="review" model_id="5546499" privacy="1" class="nav-link">Only friends can comment</a>
									</li>
									<li class="nav-item">
									    <a model_type="review" model_id="5546499" privacy="2" class="nav-link">Only I can comment</a>
									</li>
							</div>
						</ul>
					</div>
					<div class="col-auto ml-auto">
						<button class="btn btn-main" id="comment-submit" model_id="5546499" model_type="review">Comment</button>
					</div>
			</div>
		<div class="row ">
			<div class="col">
				<h2 id="comments-header"><i class="fa-solid fa-messages"></i>  Comments</h2>
				<hr class="mt-0 mb-3">
			</div>
		</div>
		
	</div>
</div>
			</div>
		</main>
			<footer class="footer">
				<div class="container my-2">
					<div class="row mx-0">
						<div class="col px-0">
							<div class="row mx-0 text-muted">
								<div class="col-auto ml-auto ml-md-0 my-auto px-0 mr-2">
									<a href="/about/">About</a>
								</div>
								<div class="col-auto my-auto px-0 mr-2">
									<a href="/contact/">Contact</a>
								</div>
								<div class="col-auto my-auto px-0 mr-2">
									<a href="/backers/">Backers</a>
								</div>
								<div class="col-auto my-auto px-0 mr-2">
									<a href="/roadmap/">Roadmap</a>
								</div>
								<div class="col-auto my-auto px-0 mr-2">
									<a href="/about/terms-of-service/">Terms</a>
								</div>
								<div class="col-auto my-auto px-0 mr-auto mr-md-2">
									<a href="/about/privacy/">Privacy</a>
								</div>
								<div class="col-auto px-0 social-media my-auto ml-auto d-none d-md-flex">
									<a href="https://www.patreon.com/backloggd" target="_blank"><i class="fa-brands fa-patreon"></i></a>
								</div>
								<div class="col-auto ml-3 px-0 social-media my-auto d-none d-md-flex">
									<a href="https://bsky.app/profile/backloggd.com" target="_blank"><i class="fa-brands fa-bluesky"></i></a>
								</div>
								<div class="col-auto ml-3 px-0 social-media my-auto d-none d-md-flex">
									<a href="https://discord.gg/cMjGusjbwg" target="_blank"><i class="fa-brands fa-discord"></i></a>
								</div>
								<div class="col-auto ml-3 px-0 social-media my-auto d-none d-md-flex">
									<a href="https://www.threads.net/@backloggd.official" target="_blank"><i class="fa-brands fa-threads"></i></a>
								</div>
							</div>
							<div class="row mx-0 d-flex d-md-none">
								<div class="col-auto px-0 social-media my-auto ml-auto">
									<a href="https://www.patreon.com/backloggd" target="_blank"><i class="fa-brands fa-patreon"></i></a>
								</div>
								<div class="col-auto px-0 ml-3 social-media my-auto">
									<a href="https://bsky.app/profile/backloggd.com" target="_blank"><i class="fa-brands fa-bluesky"></i></a>
								</div>
								<div class="col-auto px-0 ml-3 social-media my-auto">
									<a href="https://discord.gg/cMjGusjbwg" target="_blank"><i class="fa-brands fa-discord"></i></a>
								</div>
								<div class="col-auto px-0 ml-3 social-media my-auto mr-auto">
									<a href="https://www.threads.net/@backloggd.official" target="_blank"><i class="fa-brands fa-threads"></i></a>
								</div>
							</div>
							<div class="row">
								<div class="col d-md-none"></div>
								<div class="col-auto my-auto d-none" id="nitro-gdpr-cookie-consent">
									<button class="btn btn-small btn-general mb-1" onclick="window.__cmp('showModal');">
										Update cookie preferences
									</button>
								</div>
								<div class="col-auto my-auto d-none" id="nitro-ccpa-cookie-consent">
									<span data-ccpa-link="1"></span>
								</div>
								<div class="col-auto my-auto d-none googlefc-us-states-optout">
									<button class="btn btn-small btn-general mb-1">
										Do Not Sell or Share My Personal Information
									</button>
								</div>
								<div class="col d-md-none"></div>
							</div>
							<div class="row mx-0 text-muted small">
								<div class="col-auto my-auto px-0 ml-auto ml-md-0">
									© Backloggd LLC •
								</div>
								<div class="col-auto my-auto px-0 ml-1 mr-0">
									<a href="/changelog/"><p class="my-0 ml-0">v1.18.2</p></a>
								</div>
								<div class="col-auto my-auto px-0 ml-1">
									<p class="my-auto">• Powered by</p>
								</div>
								<div class="col-auto my-auto px-0 ml-1 igdb-logo mr-auto mr-md-0">
									<a href="https://igdb.com" target="_blank"><p class="my-0 ml-0">IGDB</p></a>
								</div>
							</div>
						</div>
					</div>
				</div>
			</footer>
		<!-- Dark Overlay element -->
    	<div class="sidebar-overlay"></div>

			<!-- Add A Game Modal -->
			<div class="modal fade px-2 pr-md-0 mx-sm-auto modal-search" id="add-a-game-modal" tabindex="-1" role="dialog" aria-labelledby="add-a-game-modal" aria-hidden="true">
				<div class="modal-dialog" role="document">
					<div class="modal-content">
					<h1 class="mb-0 mb-1">Log a Game</h1>
					<div class="modal-body p-0">
						<form action="/search" accept-charset="UTF-8" method="post"><input type="hidden" name="authenticity_token" value="sR2Nspsm84iI1mYrXmdhqF3RXp5PZDuB_QXtbAMloCGeOg1075Ax5VLm-V2PYTpVN7xxes7WdvNCdiDp8eyWag" autocomplete="off" />
							<div class="input-group">
								<input class="form-control py-2 border-right-0 search-bar" id="modal-game-search" type="search" placeholder="Search" aria-label="Search" name="query" autocomplete="off" data-behavior="autocomplete-search-game">
								<span class="input-group-append">
									<button class="btn border-left-0 pl-1 pr-2 search-btn" type="submit">
										<i class="fa-solid fa-magnifying-glass"></i>
									</button>
								</span>
							</div>
</form>					</div>
					</div>
				</div>
			</div>

			<div class="row pb-2 d-none" id="cookie-banner">
				<div class="col-auto ml-auto">
					<p class="m-0 py-2">Cookies allow us to enhance our services. Do you agree to use of non-essential cookies?<br><a href="/about/privacy/#cookies">Our Cookie Policy</a></p>
				</div>
				<div class="col-auto my-auto ml-auto pr-0">
					<button id="cookie-banner-accept" class="btn btn-main py-1">Agree</button>
				</div>
				<div class="col-auto my-auto">
					<button class="btn btn-general py-1 cookie-banner-deny">Disagree</button>
				</div>
			</div>

		<!-- Warning Dialog Modal -->
		<div class="micro-modal micromodal-slide" id="journal-warning-modal" aria-hidden="true">
			<div class="modal__overlay" tabindex="-1" data-micromodal-close>
				<div class="modal__container py-3 mx-3" role="dialog" aria-modal="true" aria-labelledby="journal-warning-title">
					<div class="modal__content container-fluid my-0">
						<div class="row">
							<div class="col">
								<h5 class="mb-0 main-header"><i class="fa-solid fa-triangle-exclamation"></i> Warning</h5>
							</div>
						</div>
						<div class="row my-2">
							<div class="col">
								<p class="mb-0" id="warning-desc"></p>
							</div>
						</div>
						<div class="row d-none" id="password-section">
							<div class="col">
								<p class="subtitle-text mb-1">Verify your password to continue:</p>
								<input class="backloggd-field w-100" type="password" id="warning-verify-password">
								<p class="subtitle-text mt-1 text-right d-none text-white" id="verify-password-incorrect">Incorrect -- try again</p>
							</div>
						</div>
						<div class="row mt-3">
							<div class="col-auto">
								<div class="btn btn-general w-100" id="warning-abort"></div>
							</div>
							<div class="col-auto ml-auto pr-0">
								<div class="btn btn-general w-100" id="warning-cancel" data-micromodal-close></div>
							</div>
							<div class="col-auto">
								<div class="btn btn-main w-100" id="warning-save"></div>
							</div>
						</div>
					</div>
				</div>
			</div>
		</div>

			<!-- Play Date Modal -->
			<div class="micro-modal micromodal-slide backloggd-modal" id="playthrough-modal" aria-hidden="true">
				<div class="modal__overlay" tabindex="-1" data-close-parent-modal>
					<div class="modal__container p-0" role="dialog" aria-modal="true" aria-labelledby="playthrough-modal-title">
					<div class="p-0 m-0 modal__content container-fluid" id="playthrough-modal-content">
					</div>
					</div>
				</div>
			</div>

			<div class="micro-modal micromodal-slide scrollbar-secondary" id="list-modal" aria-hidden="true">
				<div class="modal__overlay" tabindex="-1" data-close-parent-modal>
					<div class="modal__container mx-3" role="dialog" aria-modal="true" aria-labelledby="list-modal-title">
						<div class="p-3 pt-3 modal__header">
							<h5 class="mb-0 main-header" id="play-type-modal-title">Manage your lists</h5>
							<p class="mb-0 subtitle-text" id="list-modal-game-title"></p>
						</div>
						<div class="modal__content container-fluid my-0">
							<div class="row pt-2" id="list-container">
							</div>
						</div>
						<div class="modal__footer container-fluid mt-2 mb-3">
							<div class="row">
								<div class="col-auto">
									<div class="btn btn-general" data-micromodal-close>Cancel</div>
								</div>
								<div class="col-auto ml-auto">
									<button class="btn btn-main" id="add-to-list-save">Save changes</button>
								</div>
							</div>
						</div>
					</div>
				</div>
			</div>

			<div class="micro-modal micromodal-slide" id="report-modal" aria-hidden="true" data-controller="report">
			</div>

			<div class="micro-modal micromodal-slide" id="feedback-modal" aria-hidden="true">
				<div class="modal__overlay" tabindex="-1" data-micromodal-close>
					<div class="modal__container" role="dialog" aria-modal="true" aria-labelledby="feedback-modal-title">
						<div class="modal__content container-fluid">
							<div class="row">
								<div class="col">
									<p class="mb-0" id="feedback-question-label"></p>
								</div>
							</div>
							<div class="row">
								<div class="col text-center">
									<input type="radio" name="feedback" id="feedback_sad" value="sad" /><label class="feedback_sad" for="feedback_sad"><i class="fa-solid fa-face-frown"></i></label>
								</div>
								<div class="col text-center">
									<input type="radio" name="feedback" id="feedback_neutral" value="neutral" /><label class="feedback_neutral" for="feedback_neutral"><i class="fa-solid fa-face-meh"></i></label>
								</div>
								<div class="col text-center">
									<input type="radio" name="feedback" id="feedback_happy" value="happy" /><label class="feedback_happy" for="feedback_happy"><i class="fa-solid fa-face-smile"></i></label>
								</div>
							</div>
							<div class="row">
								<div class="col">
									<p class="mb-0">Add more detail <small class="subtitle-text">Optional</small></p>
								</div>
							</div>
							<div class="row">
								<div class="col">
									<textarea name="feedback_body" id="feedback_body" rows="4" placeholder="Share your thoughts!" class="p-2 w-100 backloggd-field">
</textarea>
								</div>
							</div>
							<div class="row" id="beta-opt-out-text">
								<div class="col">
									<p class="mb-0 subtitle-text text-center">You can disable this beta in your Profile Settings</p>
								</div>
							</div>
							<hr class="my-2">
							<div class="row">
								<div class="col-auto">
									<button class="btn btn-general" data-micromodal-close>Cancel</button>
								</div>
								<div class="col-auto ml-auto">
									<button class="btn btn-main" id="feedback-submit" disabled>Submit</button>
								</div>
							</div>
						</div>
					</div>
				</div>
			</div>

				<!-- Journal Modal -->
				<div class="modal fade pr-0 backloggd-modal" id="journal-game-modal" role="dialog" aria-labelledby="journal-game-modal" aria-hidden="true" max-logs="50" modal_type="">
					<div class="modal-dialog" role="document">
						<div class="modal-content">
							<div class="modal-body py-0" type="full">
							</div>
						</div>
					</div>
				</div>

				<div class="micro-modal micromodal-slide" id="quick-play-type-modal" game_id="" aria-hidden="true">
					<div class="modal__overlay" tabindex="-1" data-micromodal-close>
						<div class="modal__container" role="dialog" aria-modal="true" aria-labelledby="play-type-modal-title">
						<div class="pt-1 modal__header">
							<h5 class="mb-0" id="play-type-modal-title">Set your played status</h5>
						</div>
						<div class="modal__content container-fluid">
								<div class="row pt-1 pb-2 mb-2 play-type-option fill-in" id="played" status="5" title="Played">
									<div class="col-12 my-auto">
										<h3 class="mb-0"><i class="fa-solid fa-square"></i> Played</h3>
										<p class="subtitle-text mb-0">Nothing specific</p>
									</div>
								</div>
								<div class="row pt-1 pb-2 mb-2 play-type-option fill-in" id="completed" status="0" title="Completed">
									<div class="col-12 my-auto">
										<h3 class="mb-0"><i class="fa-solid fa-square"></i> Completed</h3>
										<p class="subtitle-text mb-0">Beat your main objective</p>
									</div>
								</div>
								<div class="row pt-1 pb-2 mb-2 play-type-option fill-in" id="retired" status="3" title="Retired">
									<div class="col-12 my-auto">
										<h3 class="mb-0"><i class="fa-solid fa-square"></i> Retired</h3>
										<p class="subtitle-text mb-0">Finished with a game that lacks an ending</p>
									</div>
								</div>
								<div class="row pt-1 pb-2 mb-2 play-type-option fill-in" id="shelved" status="4" title="Shelved">
									<div class="col-12 my-auto">
										<h3 class="mb-0"><i class="fa-solid fa-square"></i> Shelved</h3>
										<p class="subtitle-text mb-0">Unfinished but may pick up again later</p>
									</div>
								</div>
								<div class="row pt-1 pb-2 mb-2 play-type-option fill-in" id="abandoned" status="2" title="Abandoned">
									<div class="col-12 my-auto">
										<h3 class="mb-0"><i class="fa-solid fa-square"></i> Abandoned</h3>
										<p class="subtitle-text mb-0">Unfinished and staying that way</p>
									</div>
								</div>
							<div class="row mt-4">
								<div class="col">
									<button class="btn btn-general w-100" id="unset-played-btn"><i class="fa-kit fa-gamepad-classic-light"></i> Mark as unplayed</button>
								</div>
							</div>
						</div>
						</div>
					</div>
				</div>
		
	</body>
</html>
`, { baseUrl: url });

  /** Resolves {@link local} as a string relative to {@link url}. Null-safe. */
  function resolveUrl(local, baseUrl = url) {
    if (!local) return local;
    return new URL(local, baseUrl).toString();
  }

  const args = {};
  args.avatar = resolveUrl($("#avatar img").attr("src"));
  args.backer = !!$(".review-card .backer-badge").length;

  const gameLink = $(".review-game-link");
  args.game = gameLink.text();
  const gameUrl = (args.gameUrl = resolveUrl(gameLink.attr("href")));

  const dateText = $(".review-bottom-bar > :last-child").text().trim();
  if (!dateText.startsWith("Reviewed on")) {
    throw new Error(`Unexpected date text "${dateText}"`);
  }
  args.date = dates
    .parse(dateText.substring("Reviewed on ".length))
    .toISOString();

  let poster = resolveUrl($(".game-cover img").attr("src"));
  if (poster && !poster.includes("/no_image-")) args.poster = poster;

  const stars = $(".stars-top");
  args.rating = stars.length
    ? parseInt(stars.css().width.slice(0, -1)) / 20
    : undefined;

  const statusLink = $(".game-status a");
  args.status = statusLink.text().trim() || undefined;
  args.statusUrl = resolveUrl(statusLink.attr("href"));

  const platformLink = $(".review-platform");
  args.platform = platformLink.text().trim() || undefined;
  args.platformUrl = resolveUrl(platformLink.attr("href"));

  const gameResponse = await fetch(gameUrl);
  const game$ = cheerio.load(await gameResponse.text(), { baseUrl: gameUrl });
  const image = game$("#artwork-high-res");
  args.image = resolveUrl(image.attr("src"), gameUrl);

  return (
    "{% backloggd " +
    JSON.stringify(url.toString()) +
    ",\n" +
    Object.entries(args)
      .filter(([_, value]) => value)
      .map(([name, value]) => `    ${name}: ${JSON.stringify(value)}`)
      .join(",\n") +
    " %}\n" +
    (
      await prettier.format($(".review-body > div > div > div").html(), {
        parser: "html",
        printWidth: 78,
      })
    )
      .trim()
      .replaceAll(/^/gm, "  ") +
    "\n{% endbackloggd %}"
  );
}
