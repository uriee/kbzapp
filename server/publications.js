Meteor.publish('users', function(postId) {
  return Meteor.users.find({},{fields: {username: 1}});
});

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
  Meteor.publish('memberProposals', function(member_id,options) {
    return Proposals.find({'initiator' : query.member_id}, options);
  });
});

Meteor.publish('singleProposal', function(id) {
  return id && Proposals.findOne(id);
});

/*----------------kbz-----------------------*/
Deps.autorun(function () {
  Meteor.publish('kbzs', function(options) {
    console.log(userkbzs(this.userId));
    var kbzs = 0;
    if(this.userId) {
      kbzs =  Kbz.find({'_id' : {$in : userkbzs(this.userId)}});
    }
    return kbzs;
  });
});

/*--------------members-------------------------*/

Meteor.publish('kbz_members', function(kbz,options) {
 // return Members.find({'kbz_id' : kbz}, options);
  return Members.find({});
});

/*--------------statements-------------------------*/
Deps.autorun(function () {
  Meteor.publish('kbz_statemenets', function(options) {
    return Statements.find({'kbz_id' : {$in : Session.get('current_kbz_id')}}, options);
  });
});