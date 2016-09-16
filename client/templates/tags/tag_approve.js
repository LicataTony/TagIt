Template.tagApprove.helpers({
  tags: function(){
    console.log(this.tagName);
    return Tags.find();
  }
});
