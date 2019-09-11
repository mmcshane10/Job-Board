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
    $('.populate').text("")

    let jobSearch = new JobSearch();
    let promise = jobSearch.getJobPosting(location, keyword);

    promise.then(function(response) {
      let body = JSON.parse(response);
      for (var i = 0; i < body.length; i++) {
        $(".populate").append(
          `<div class="card bg-light mb-3">
            <div class="card-header">
              <div id=title${i}></div>
            </div>
            <div class="card-body">
              <div id=company${i}></div>
              <div id=location${i}></div>
              <div id=description${i}></div>
              <div id=url${i}></div>
            </div>
          </div>`);
        // $(`#logo${i}`).html(`<img src=${body[i].company_logo}>`);
        $(`#title${i}`).html(body[i].title);
        $(`#company${i}`).html(

          `<p> <span class='strong'>Company:</span> <a href=${body[i].company_url}> ${body[i].company} </a> </p>`


        );
        $(`#location${i}`).html(`<p><span class='strong'>Location:</span> ${body[i].location}</p>`);
        $(`#url${i}`).html(`<p><span class='strong'><a href=${body[i].url}>Visit Website</a></span></p>`)
        $(`#description${i}`).html(body[i].description);
      }
      console.log(body);
    }, function (error) {
      $('#showErrors').text(`There was an error processing your request: ${error.message}`);
    });
  });
});
