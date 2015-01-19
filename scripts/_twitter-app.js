// MODELS

Tweets = Backbone.Model.extend({});

TweetsCollection = Backbone.Collection.extend({
    model:Tweets,
    url:"/inc/tweets.php"
});

tweets = new TweetsCollection([
], { mode: "client" });

// VIEWS

TweetView = Backbone.View.extend({		
	className: 'tweets',

	template: Handlebars.compile($("#app-tweets").html()),

    initialize:function (e) {
		this.listenTo(this.collection,'reset', this.renderList);
    },

	renderList : function(tweets){
		$(this.el).empty();
        _.each(tweets.models, function (tweets) {
            $(this.el).append(this.template(tweets.attributes));
        }, this);
		
		return this;
	},
});

allTweets = TweetView.extend({ });

Handlebars.registerHelper('formatTweet', function(tweet) {

	// Thanks to @rem for doing all the regex!
	// Borrowed from https://github.com/remy/twitterlib/blob/master/twitterlib.js
	
	var ify = function() {
	    return {
	      entities: function (t) {
	        return t.replace(/(&[a-z0-9]+;)/g, function (m) {
	          return ENTITIES[m];
	        });
	      },
	      link: function(t) {
	        return t.replace(/[a-z]+:\/\/([a-z0-9-_]+\.[a-z0-9-_:~\+#%&\?\/.=]+[^:\.,\)\s*$])/ig, function(m, link) {
	          return '<a title="' + m + '" href="' + m + '" target="_blank">' + ((link.length > 36) ? link.substr(0, 35) + '&hellip;' : link) + '</a>';
	        });
	      },
	      at: function(t) {
	        return t.replace(/(^|[^\w]+)\@([a-zA-Z0-9_]{1,15}(\/[a-zA-Z0-9-_]+)*)/g, function(m, m1, m2) {
	          return m1 + '<a href="http://twitter.com/' + m2 + '" target="_blank">@' + m2 + '</a>';
	        });
	      },
	      hash: function(t) {
	        return t.replace(/(^|[^&\w'"]+)\#([a-zA-Z0-9_^"^<]+)/g, function(m, m1, m2) {
	          return m.substr(-1) === '"' || m.substr(-1) == '<' ? m : m1 + '<a href="http://search.twitter.com/search?q=%23' + m2 + '" target="_blank">#' + m2 + '</a>';
	        });
	      },
	      clean: function(tweet) {
	        return this.hash(this.at(this.link(tweet)));
	      }
	    };
	  }();
	  
	  return ify.clean(tweet);
  
});

Handlebars.registerHelper('dateFormat', function(tweetDate) {
	//return moment(tweetDate, 'dd MMM DD HH:mm:ss ZZ YYYY', 'en').format("MMM DD, YYYY hh:mm:ss A");
	return moment(tweetDate, 'dd MMM DD HH:mm:ss ZZ YYYY', 'en').fromNow();
});