// MODELS

Instagrams = Backbone.Model.extend({});

InstagramsCollection = Backbone.Collection.extend({
    model:Instagrams,
    url:"/inc/instagram.php",
});

instagrams = new InstagramsCollection([
], { mode: "client" });


// VIEWS

InstagramsView = Backbone.View.extend({		
	className: 'instagrams',

	template: Handlebars.compile($("#app-instagram").html()),

    initialize:function (e) {
		this.listenTo(this.collection,'reset', this.renderList);
    },

	renderList : function(instagrams){
		var grams = instagrams.models[0].attributes.data
		
        _.each(grams, function (grams) {
            $(this.el).append(this.template(grams));
        }, this);
		
		return this;
	},
});

allGramsView = InstagramsView.extend({ });