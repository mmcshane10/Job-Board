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
    $('#ghpopulate').text("");
    $('#ajpopulate').text("");

    let ghjobSearch = new JobSearch();
    let promise1 = ghjobSearch.getGHJobPosting(location, keyword);
    let ajjobsearch = new JobSearch();
    let promise2 = ajjobsearch.getAJJobPosting(location, keyword);

    Promise.all([promise1,promise2]).then(function(response) {
      let bodyGH = JSON.parse(response[0]);
      for (let i = 0; i < bodyGH.length; i++) {
        $("#ghpopulate").append(
          `<div id="accordion">
          <div class="card bg-light mb-3">
          <div class="card-header" id="ghheading${i}" data-toggle="collapse" data-target="#ghcollapse${i}" aria-expanded="true" aria-controls="collapseOne"><span id=ghtitle${i}></div>
          <div id="ghcollapse${i}" class="collapse show" aria-labelledby="ghheading${i}" data-parent="#accordion">
          <div class="card-body">
          <div id=ghcompany${i}></div>
          <div id=ghlocation${i}></div>
          <div id=ghdescription${i}></div>
          <div id=ghurl${i}></div>
          <p class="jobsource">Listed on GitHub Jobs</p>
          </div>
          </div>
          </div>
          </div>`);
          // $(`#logo${i}`).html(`<img src=${bodyGH[i].company_logo}>`);
          $(`#ghtitle${i}`).html(bodyGH[i].title);
          $(`#ghcompany${i}`).html(`<p><span class='strong'>Company:</span> <a href=${bodyGH[i].company_url}>${bodyGH[i].company}</a></p>`);
          $(`#ghlocation${i}`).html(`<p><span class='strong'>Location:</span> ${bodyGH[i].location}</p>`);
          $(`#ghurl${i}`).html(`<p><span class='strong'><a href=${bodyGH[i].url}>Visit Website</a></span></p>`);
          $(`#ghdescription${i}`).html(bodyGH[i].description);
        }
        let bodyAJ = JSON.parse(response[1]);
        if (bodyAJ.listings.total === 0) {
          return
        } else {
          for (let i = 0; i < bodyGH.length; i++) {
            $("#ajpopulate").append(
              `<div id="accordion">
              <div class="card bg-light mb-3">
              <div class="card-header" id="ajheading${i}" data-toggle="collapse" data-target="#ajcollapse${i}" aria-expanded="true" aria-controls="collapseOne"><span id=ajtitle${i}></div>
              <div id="ajcollapse${i}" class="collapse show" aria-labelledby="ajheading${i}" data-parent="#accordion">
              <div class="card-body">
              <div id=ajcompany${i}></div>
              <div id=ajlocation${i}></div>
              <div id=ajdescription${i}></div>
              <div id=ajurl${i}></div>
              <p class="jobsource">Listed on Authentic Jobs</p>
              </div>
              </div>
              </div>
              </div>`);
              $(`#ajtitle${i}`).html(bodyAJ.listings.listing[i].title);
              $(`#ajcompany${i}`).html(`<p><span class='strong'>Company:</span> <a href=${bodyAJ.listings.listing[i].company.url}>${bodyAJ.listings.listing[i].company.name}</a></p>`);
              $(`#ajlocation${i}`).html(`<p><span class='strong'>Location:</span> ${bodyAJ.listings.listing[i].company.location.name}</p>`);
              $(`#ajurl${i}`).html(`<p><span class='strong'><a href=${bodyAJ.listings.listing[i].url}>Visit Website</a></span></p>`);
              $(`#ajdescription${i}`).html(bodyAJ.listings.listing[i].description);
            }
          }
        }, function (error) {
          $('#showErrors').text(`There was an error processing your request: ${error.message}`);
          console.log('#showErrors');
        });
      });
    });
