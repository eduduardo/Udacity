# Project Overview

In this project you are given a web-based application that reads RSS feeds. The original developer of this application clearly saw the value in testing, they've already included [Jasmine](http://jasmine.github.io/) and even started writing their first test suite! Unfortunately, they decided to move on to start their own company and we're now left with an application with an incomplete test suite. That's where you come in.

## Quick start
1. Clone this repo into your machine
2. Start `index.html` to see the results or run you local server:
```
php -S localhost:8080
```
or deploy on an external server.
3. Test the website, and see the jasmine results

## Tests:
- RSS Feeds:
  - Feeds are defined
  - Feeds should have URL defined and not empty
  - Feeds should have a name defined and not empty
- The menu:
  - should be hidden by default
  - should be not hidden when clicked and hidden when clicked again
- Initial Entries:
  - should have at least one entry
- New Feed Selection:
  - should changes content on new feed load
