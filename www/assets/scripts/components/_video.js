var video = {
	el: {},
	setup: function(videoID, callback) {
		video.el.video = document.getElementById(videoID);
		video.click(callback);

		video.el.playBtn   = $('#play');
		video.el.pauseBtn  = $('#pause');
		video.el.replayBtn = $('#replay');
		video.el.cta	   = $('.belowPopup');
	},
	click: function(callback) {
		var clickEventType = ((document.ontouchstart!==null)?'click':'touchstart');
		var thisVideo = video.el.video;

		thisVideo.addEventListener(clickEventType, function() {
			video.el.replayBtn.fadeOut();
			video.el.cta.fadeOut();
			if (thisVideo.paused == true) {
				console.log('videoIsPaused');
				video.el.pauseBtn.fadeOut();
				video.el.playBtn.fadeIn().delay(300).fadeOut();
				thisVideo.play();
			} else {
				console.log('videoIsPlaying');
				video.el.pauseBtn.fadeIn();
				thisVideo.pause();
			}
		});

		thisVideo.addEventListener('ended',function() {
			video.el.replayBtn.fadeIn();
			video.el.cta.fadeIn();
			if(callback) callback();
		},false);
	}
};