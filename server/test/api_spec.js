var frisby = require('frisby');

var URL = 'http://localhost:9312';

var test1 = frisby.create('GET all episodes but response empty')
    .get(URL + '/')
    .expectStatus(204).toss();

var test2 = frisby.create('POST one episode')
    .post(URL + '/', {
        title: "The Big Bang Theory",
        season: 1,
        episode: 1
    }, {json: true})
    .expectHeaderContains('content-type', 'application/json')
    .expectJSONTypes({
        episode: Number,
        id: String,
        title: String,
        season: Number
    })
    .expectJSON({
        title: 'The Big Bang Theory',
        season: 1,
        episode: 1
    })
    .expectStatus(201)
    .afterJSON(function(json) {
        frisby.create('Get episode added')
            .get(URL + '/episode?id=' + json.id)
            .expectStatus(200)
            .expectHeaderContains('content-type', 'application/json')
            .expectJSONTypes({
                episode: Number,
                id: String,
                title: String,
                season: Number
            })
            .expectJSON({
                title: 'The Big Bang Theory',
                season: 1,
                episode: 1,
                id: json.id
            })
            .toss()
    })
    .toss();

var test3 = frisby.create('GET nonexistent episode')
    .get(URL + '/episode?id=aaaaa')
    .expectStatus(404)
    .toss()

var test4 = frisby.create('GET all episodes')
    .get(URL + '/')
    .expectStatus(200)
    .expectHeader('content-type', 'application/json').toss();

var test5 = frisby.create('Get anything')
    .get(URL + '/truc')
    .expectStatus(404)


var test6 = frisby.create('PUT /')
        .put(URL + '/')
        .expectStatus(405)
        .toss();

var test7 = frisby.create('PUT /truc')
        .put(URL + '/truc')
        .expectStatus(405)
        .toss();
