try {
	var pathName = location.pathname.replace(/\//g, "");
	if (pathName.length === 40) {
		var nextLogoURL = chrome.extension.getURL("icon16.png");
		var torrentName = document.querySelector(".download h2 span").innerHTML.replace(/<[^>]*>/g, "").replace(/\[(.*?)\]/g, "").replace(/\((.*?)\)/g, "");
		var rx = /S?0*(\d+)?(?:E|Ep)0*(\d+)/i; // gets SxxExx or SxxEPxx
		var episodeData = rx.exec(torrentName);
		
		if (episodeData != undefined && episodeData.length > 0) {
			var thisSeason = parseInt(episodeData[1]);
			var nextEpisode = parseInt(episodeData[2])+1;
			
			// prepend zero if season or episode < 10
			if (thisSeason < 10) {
				thisSeason = "0" + thisSeason;
			}
			if (nextEpisode < 10) {
				nextEpisode = "0" + nextEpisode;
			}	
			
			// get full next episode id
			var nextEpisodeFull = "S" + thisSeason + "E" + nextEpisode;
			
			var nextEpisodeSearch = torrentName.split(episodeData[0])[0].replace(/\./g, " ") + nextEpisodeFull.replace(/\./g, "+");	
			var nextEpisodeLink = "/search?q=" + nextEpisodeSearch;
			
			document.querySelector(".download dl").insertAdjacentHTML("afterend", '<dl><dt><a href="' + nextEpisodeLink + '"><span class="u" style="background: transparent url(\'' + nextLogoURL + '\') no-repeat 5px center;">' + nextEpisodeSearch.replace(/\./g, " ") + '</span></a></dt></dl>');
		}
	} else if (pathName.match(/search/i)) {
		var rx = /q?=(.*?)(&|$)/; // everything between "q?=" to ("&" or end of line)
		var searchName = rx.exec(location.search);
		
		rx = /S?0*(\d+)?[xE]0*(\d+)/i; // SxxExx
		var episodeData = rx.exec(searchName[1]);
		
		if (episodeData != undefined && episodeData.length > 0) {
			var thisSeason = parseInt(episodeData[1]);
			var nextSeason = parseInt(episodeData[1])+1;
			var nextEpisode = parseInt(episodeData[2])+1;
			
			// prepend zero if season or episode < 10
			if (thisSeason < 10) {
				thisSeason = "0" + thisSeason;
			}
			if (nextSeason < 10) {
				nextSeason = "0" + nextSeason;
			}
			if (nextEpisode < 10) {
				nextEpisode = "0" + nextEpisode;
			}	
			
			// get full next episode id
			var nextEpisodeFull = "S" + thisSeason + "E" + nextEpisode;
			var nextSeasonFull = "S" + nextSeason + "E01";
			var nameOfShow = searchName[1].split(episodeData[0])[0].replace(/\+/g, " ").replace(/%20/g, " ");
			
			var nextEpisodeSearch = nameOfShow + nextEpisodeFull;
			var nextEpisodeLink = "/search?q=" + nextEpisodeSearch;
			
			var nextSeasonSearch = nameOfShow + " " + nextSeasonFull;
			var nextSeasonLink = "/search?q=" + nextSeasonSearch;
			
			if (document.querySelector(".results h2").innerHTML === "No Torrents Found") {
				document.querySelector(".note").insertAdjacentHTML("beforeend", '<br>- Try <a href="' + nextSeasonLink + '">next season - ' + nextSeasonSearch + '</a>');
			} else {
				document.querySelector(".results dl").insertAdjacentHTML("beforebegin", '<dl><dt><a href="' + nextEpisodeLink + '"><b>' + nextEpisodeSearch + '</b></a> » next episode</dt></dl>');
			}
		}
	}
} catch (e) {}