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

    let jobSearch = new JobSearch();
    let promise = jobSearch.getJobPosting(location, keyword);

    promise.then(function(response) {
      let body = JSON.parse(response);
      for (var i = 0; i < body.length; i++) {
        $(".populate").append(`<div id=logo${i}></div> <div id=title${i}></div>`);
        // $(`#logo${i}`).html(`<img src=${body[i].company_logo}>`);
        $(`#logo${i}`).html(body[i].location);
        console.log(body[i].location);
        $(`#title${i}`).html(body[i].title);
      }
    }, function (error) {
      $('#showErrors').text(`There was an error processing your request: ${error.message}`);
    });
  });
});
