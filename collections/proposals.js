Proposals = new Meteor.Collection('proposals');

Proposals.allow({
   remove: ownsProposal
});

Proposals.deny({
  update: function(userId, post, fieldNames) {
    // may only edit the following two fields:
    return (_.without(fieldNames, 'body', 'title').length > 0);
  }
});

Meteor.methods({
  proposal: function(postAttributes) {
    var user = Meteor.user()
    ctype = Session.get('proposal_type');
      // ensure the user is logged in
    if (!user)
      throw new Meteor.Error(401, "You need to login to post new stories");
    
    // ensure the post has a title
    if (!postAttributes.title)
      throw new Meteor.Error(422, 'Please fill in a title');

    if (!postAttributes.body)
      throw new Meteor.Error(422, 'Please fill in a body');
    
    Proposal = {};
    Proposal.title = postAttributes.title;
    Proposal.body = postAttributes.body;
    Proposal.kbz_Id = Session.get('kbz_id'); 
    Propsal.member_Id = Session.get('member_id');
    Proposal.type = ctype;
    Proposal.status = "3";
    Proposal.age = 0;
    Proposal.support = {"count" : 0, "percent" : 0,"members" : []};
    Proposal.votes = {"pro" : 0,"against" : 0, "members" : []};
    
    if (ctype=="ME" || cttype=="EM") {
      Proposal.member_id = uniq.member_id;
    }
    if (ctype=="CS") {
      Proposal.statement_id = uniq.statement_id;
    }
    if (ctype=="NS") {
      Proposal.statement = uniq.statement;
    }
    if (ctype=="RS") {
      Proposal.statement_id = uniq.statement_id;
      Proposal.newstatement = uniq.newstatement;
      Proposal.oldstatement = uniq.oldstatement;
    }
    if (ctype=="CV") {
      Proposal.variable = uniq.variable;
      Proposal.newvalue = uniq.newvalue;
    }
    if (ctype=="NA") {
      Proposal.actionname = uniq.actionname;
    }
    if (ctype=="CA") {
      Proposal.action_id = uniq.action_id;
    }
    if (ctype=="CM" || ctype=="OC") {
      Proposal.member_id = uniq.member_id;
      Proposal.action_id = uniq.action_id;
    }                             
    
    var proposalId = proposals.insert(Proposal);
    return proposalId;
  }
 
/*  
  vote: function(postId) {
    var user = Meteor.user();
    // ensure the user is logged in
    if (!user)
      throw new Meteor.Error(401, "You need to login to upvote");
    
    proposals.update({
      _id: postId, 
      upvoters: {$ne: user._id}
    }, {
      $addToSet: {upvoters: user._id},
      $inc: {votes: 1}
    });
  }
*/  
});