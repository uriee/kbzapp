Router.configure({
  layoutTemplate: 'layout',
  loadingTemplate: 'loading',
  waitOn: function() { 
    return [Meteor.subscribe('notifications')]
  }
});

PostsListController = RouteController.extend({
  template: 'postsList',
  increment: 5, 
  limit: function() { 
    return parseInt(this.params.postsLimit) || this.increment; 
  },
  findOptions: function() {
    return {sort: this.sort, limit: this.limit()};
  },
  waitOn: function() {
    return Meteor.subscribe('posts', this.findOptions());
  },
  posts: function() {
    return Posts.find({}, this.findOptions());
  },
  data: function() {
    var hasMore = this.posts().count() === this.limit();
    return {
      posts: this.posts(),
      nextPath: hasMore ? this.nextPath() : null
    };
  }
});

ProposalsListController = RouteController.extend({
  template: 'proposalsList',
  increment: 5, 
  limit: function() { 
    return parseInt(this.params.proposalsLimit) || this.increment; 
  },
  findOptions: function() {
    return {sort: this.sort, limit: this.limit()};
  },
  query: function() {
    return {query: this.query || {}};
  },
  waitOn: function() {
    return Meteor.subscribe('proposlas',this.query() , this.findOptions());
  },
  proposals: function() {
    return proposals.find(this.query(), this.findOptions());
  },
  data: function() {
    var hasMore = this.proposals().count() === this.limit();
    return {
      posts: this.proposals(),
      nextPath: hasMore ? this.nextPath() : null
    };
  }
});

InitiatorProposalsListController = ProposalsListController.extend({
  query: {initiator : this.initiator},
  sort: {submitted: -1, _id: -1},
  nextPath: function() {
    return Router.routes.newPosts.path({postsLimit: this.limit() + this.increment})
  }
});

AllProposalsListController = ProposalsListController.extend({
  sort: {submitted: -1, _id: -1},
  nextPath: function() {
    return Router.routes.newPosts.path({postsLimit: this.limit() + this.increment})
  }
});

NewPostsListController = PostsListController.extend({
  sort: {submitted: -1, _id: -1},
  nextPath: function() {
    return Router.routes.newPosts.path({postsLimit: this.limit() + this.increment})
  }
});

BestPostsListController = PostsListController.extend({
  sort: {votes: -1, submitted: -1, _id: -1},
  nextPath: function() {
    return Router.routes.bestPosts.path({postsLimit: this.limit() + this.increment})
  }
});

Router.map(function() {
  this.route('home', {
    path: '/',
    controller: NewPostsListController
  });
  
  this.route('newPosts', {
    path: '/new/:postsLimit?',
    controller: NewPostsListController
  });
  
  this.route('bestPosts', {
    path: '/best/:postsLimit?',
    controller: BestPostsListController
  });

  this.route('allProposals', {
    path: '/allproposals/:postsLimit?',
    controller: AllProposalsListController
  });
  
  this.route('bestPosts', {
    path: '/best/:postsLimit?',
    controller: BestPostsListController
  });  
  
  this.route('postPage', {
    path: '/posts/:_id',
    waitOn: function() {
      return [
        Meteor.subscribe('singlePost', this.params._id),
        Meteor.subscribe('comments', this.params._id)
      ];
    },
    data: function() { return Posts.findOne(this.params._id); }
  });

  this.route('proposalPage', {
    path: '/posts/:_id',
    waitOn: function() {
      return [
        Meteor.subscribe('singleProposal', this.params._id),
        //Meteor.subscribe('comments', this.params._id)
      ];
    },
    data: function() { return proposals.findOne(this.params._id); }
  });  
        
  this.route('postEdit', {
    path: '/posts/:_id/edit',
    waitOn: function() { 
      return Meteor.subscribe('singlePost', this.params._id);
    },
    data: function() { return Posts.findOne(this.params._id); }
  });

  this.route('proposalEdit', {
    path: '/proposal/:_id/edit',
    waitOn: function() { 
      return Meteor.subscribe('singleProposal', this.params._id);
    },
    data: function() { return proposals.findOne(this.params._id); }
  });  

  this.route('proposalSubmit', {
    path: '/submit',
    disableProgress: true
  });
  
  this.route('postSubmit', {
    path: '/submit',
    disableProgress: true
  });
});


var requireLogin = function(pause) {
  if (! Meteor.user()) {
    if (Meteor.loggingIn())
      this.render(this.loadingTemplate);
    else
      this.render('accessDenied');
    
    pause();
  }
}

Router.onBeforeAction('loading');
Router.onBeforeAction(requireLogin, {only: ['postSubmit','proposalSubmit']});
Router.onBeforeAction(function() { clearErrors() });
