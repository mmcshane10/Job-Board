import $ from 'jquery';
import 'bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';
import './styles.css';

import { JobSearch } from './backend.js';

$(document).ready(function() {
  $('#job-search').submit(function(event) {
    event.preventDefault();
    let keyword = $('#job-keyword').val();
    let location = $('#location-keyword').val();
    $('#job-keyword').val("");
    $('#location-keyword').val("");
    $('.populate').text("");

    let ghjobSearch = new JobSearch();
    let promise1 = ghjobSearch.getGHJobPosting(location, keyword);
    let ajjobsearch = new JobSearch();
    let promise2 = ajjobsearch.getAJJobPosting(location, keyword);

    Promise.all([promise1,promise2]).then(function(response) {
      console.log(response);
      let bodyGH = JSON.parse(response[0]);
      for (var i = 0; i < bodyGH.length; i++) {
        $(".populate").append(
          `<div class="card bg-light mb-3">
            <div class="card-header">
              <div id=title${i}></div>
            </div>
            <div class="card-bodyGH">
              <div id=company${i}></div>
              <div id=location${i}></div>
              <div id=description${i}></div>
              <div id=url${i}></div>
            </div>
          </div>`);
        // $(`#logo${i}`).html(`<img src=${bodyGH[i].company_logo}>`);
        $(`#title${i}`).html(bodyGH[i].title);
        $(`#company${i}`).html(`<p><span class='strong'>Company:</span> <a href=${bodyGH[i].company_url}>${bodyGH[i].company}</a></p>`);
        $(`#location${i}`).html(`<p><span class='strong'>Location:</span> ${bodyGH[i].location}</p>`);
        $(`#url${i}`).html(`<p><span class='strong'><a href=${bodyGH[i].url}>Visit Website</a></span></p>`);
        $(`#description${i}`).html(bodyGH[i].description);
      }
      let bodyAJ = JSON.parse(response[1]);
      console.log(bodyGH);
      console.log(bodyAJ);
    }, function (error) {
      $('#showErrors').text(`There was an error processing your request: ${error.message}`);
    });
  });
});
