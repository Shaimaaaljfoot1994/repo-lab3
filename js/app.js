'use strict';

function Horns(data) {
  this.image_url = data.image_url;
  this.title = data.title;
  this.description = data.description;
  this.keyword = data.keyword;
  this.horns = data.horns;
  Horns.all.push(this);
}
Horns.all = [];

Horns.prototype.render = function() {

  let hornOutput = $('<div></div>');
      hornOutput.addClass(this.keyword);

  let template = $('#photo-template').html();

  hornOutput.html( template );

  hornOutput.find('h2').text( this.title );
  hornOutput.find('img').attr('src', this.image_url);
  hornOutput.find('p').text(this.description);

  $('main').append(hornOutput);

};

function populateSelectBox() {
  let seen = {};
  let select = $('select');
  Horns.all.forEach( (horn) => {
    if ( ! seen[horn.keyword] ) {
      let option = `<option value="${horn.keyword}">${horn.keyword}</option>`;
      select.append(option);
      seen[horn.keyword] = true;
    }
  });

  console.log(seen);
}

$('select').on('change', function() {
  let selected = $(this).val();
  if (selected === 'default')
  {
    $('div').show();
    $(`.${selected}`).fadeIn(800);
  }
  else {
    $('div').hide();
    $(`.${selected}`).fadeIn(800);
  }
  
});

$.get('../data/page-1.json')
  .then( data => {
    data.forEach( (thing) => {
      let horn = new Horns(thing);
      horn.render();
    });
  })
  .then( () => populateSelectBox() );