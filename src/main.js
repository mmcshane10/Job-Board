import $ from 'jquery';
import 'bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';
import './styles.css';

import { JobSearch } from './backend';

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
      console.log(body);
      console.log(body[0]);
      $('#show ').text(`${body[0]}`);
      // $('.showTemp').text(`The temperature in Kelvins is ${body.main.temp} degrees.`);
    }, function(error) {
      $('#showErrors').text(`There was an error processing your request: ${error.message}`);
    });
  });
});
