const evtSource = new EventSource('../../server.js');

const questions = [
    {
        id: 'Q1',
        question: 'Q1. Your mind is always buzzing with unexplored ideas and plans.'
    },
    {
        id: 'Q2',
        question: 'Q2. Generally speaking, you rely more on your experience than your imagination.'
    },
    {
        id: 'Q3',
        question: 'Q3. You find it easy to stay relaxed and focused even when there is some pressure.'
    },
    {
        id: 'Q4',
        question: 'Q4. You rarely do something just out of sheer curiosity.'
    },
    {
        id: 'Q5',
        question: 'Q5. People can rarely upset you.'
    },
    {
        id: 'Q6',
        question: 'Q6. It is often difficult for you to relate to other people’s feelings.'
    },
    {
        id: 'Q7',
        question: 'Q7. In a discussion, truth should be more important than people’s sensitivities.'
    },
    {
        id: 'Q8',
        question: 'Q8. You rarely get carried away by fantasies and ideas.'
    },
    {
        id: 'Q9',
        question: 'Q9. You think that everyone’s views should be respected regardless of whether they are supported by facts or not.'
    },
    {
        id: 'Q10',
        question: 'Q10. You feel more energetic after spending time with a group of people.'
    },
];

const testImage = function(url, timeoutT) {
    return new Promise(function (resolve, reject) {
        var timeout = timeoutT || 5000;
        var timer, img = new Image();
        img.onerror = img.onabort = function () {
            clearTimeout(timer);
            reject("error");
        };
        img.onload = function () {
            clearTimeout(timer);
            resolve("success");
        };
        timer = setTimeout(function () {
            // reset .src to invalid URL so it stops previous
            // loading, but doesn't trigger new load
            img.src = "//!!!!/test.jpg";
            reject("timeout");
        }, timeout);
        img.src = url;
    });
};

// Creates all the radio buttons in the form
for (const q of questions) {
    let html = `<fieldset class="form-group">
            <legend>%question%</legend>
            <div class="form-check form-check-inline">
            <input class="form-check-input" type="radio" name="%id%" id="%id%a" value="option1" required>
            <label class="form-check-label" for="%id%a">1 (Strongly Disagree)</label>
            </div>
            <div class="form-check form-check-inline">
            <input class="form-check-input" type="radio" name="%id%" id="%id%b" value="option2">
            <label class="form-check-label" for="%id%b">2</label>
            </div>
            <div class="form-check form-check-inline">
            <input class="form-check-input" type="radio" name="%id%" id="%id%c" value="option3">
            <label class="form-check-label" for="%id%c">3</label>
            </div>
            <div class="form-check form-check-inline">
            <input class="form-check-input" type="radio" name="%id%" id="%id%d" value="option4">
            <label class="form-check-label" for="%id%d">4</label>
            </div>
            <div class="form-check form-check-inline">
            <input class="form-check-input" type="radio" name="%id%" id="%id%e" value="option5">
            <label class="form-check-label" for="%id%e">5 (Strongly Agree)</label>
            </div>
            </fieldset>`;
    // Replace placeholder text with some actual data
    html = html.replace('%question%', q.question);
    html = html.replace(/%id%/g, q.id);
    document.querySelector('.btn').insertAdjacentHTML('beforebegin', html);
}

document.querySelector('.submit').addEventListener('click', event => {
    event.preventDefault();
    let url = document.querySelector('#link_field').value;
    const form = document.querySelector('form');
    //const queryUrl = form.getAttribute('action');

    testImage(url)
        .then(res => form.submit())
        .catch(err => {
            $('#urlModal').modal('show');
        });
});
