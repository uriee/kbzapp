Meteor.publish('posts', function(options) {
  return Posts.find({}, options);
});

Meteor.publish('singlePost', function(id) {
  return id && Posts.find(id);
});


Meteor.publish('comments', function(postId) {
  return Comments.find({postId: postId});
});

Meteor.publish('notifications', function() {
  return Notifications.find({userId: this.userId});
});

/*----------------proposals--------------------------*/
Meteor.publish('allProposals', function(options) {
  return Proposals.find({}, options);
});

Deps.autorun(function () {
  Meteor.publish('liveProposals', function(options) {
    return Proposals.find({'kbz_id' : Session.get('current_kbz_id') , 'status' : {$in : [4,5,6]}}, options);
  });
});

Deps.autorun(function () {
  Meteor.publish('memberProposals', function(options) {
    return Proposals.find({'kbz_id' : Session.get('current_kbz_id') , 'initiator' : query.member_id}, options);
  });
});

Meteor.publish('singleProposal', function(id) {
  return id && Proposal.find(id);
});

/*----------------kbz-----------------------*/
Deps.autorun(function () {
  Meteor.publish('kbzs', function(options) {
    return Kbz.find({'kbz_id' : {$in : Session.get('kbzs')}}, options);
  });
});

Deps.autorun(function () {
  Meteor.publish('actions', function(options) {
    return Kbz.find({'kbz_id' : {$in : Session.get('current_kbz_id')}}, options);
  });
});
/*--------------members-------------------------*/
Deps.autorun(function () {
  Meteor.publish('kbz_members', function(options) {
    return Members.find({'kbz_id' : {$in : Session.get('current_kbz_id')}}, options);
  });
});
/*--------------statements-------------------------*/
Deps.autorun(function () {
  Meteor.publish('kbz_statemenets', function(options) {
    return Statements.find({'kbz_id' : {$in : Session.get('current_kbz_id')}}, options);
  });
});