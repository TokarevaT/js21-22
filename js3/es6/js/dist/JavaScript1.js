'use strict';

var questions = [{
    question: 'Что мы сейчас изучаем?',
    answers: ['HTML', 'CSS', 'JAVA']
}, {
    question: 'Какое настоящее название Javascript?',
    answers: ['ECMAScript 4', 'ECMAScript 5', 'ECMAScript 6']
}, {
    question: 'Наиболее распространненый цикл',
    answers: ['do', 'while', 'for']
}];

var rightAnswers = [{
    question: 0,
    answers: [true, false, true]
}, {
    question: 1,
    answers: [false, true, false]
}, {
    question: 2,
    answers: [false, false, true]
}];

localStorage.setItem('questions', JSON.stringify(questions));

var html = $('#test').html();
//console.log('html', html);

var content = tmpl(html, {
    data: JSON.parse(localStorage.getItem('questions'))
});
//console.log('content', content)
$('#btnCheckResults').before(content);

function showText() {
    var title = arguments.length <= 0 || arguments[0] === undefined ? 'Default title' : arguments[0];
    var a = arguments.length <= 1 || arguments[1] === undefined ? 200 : arguments[1];
    var b = arguments.length <= 2 || arguments[2] === undefined ? 300 : arguments[2];

    console.log('' + title + a + b);
}
showText('Hello World');

//MODAL WINDOW
$(document).ready(function () {
    $('a[name=modal]').click(function (e) {
        $('#lblResultsCount').html(checkResults());
        e.preventDefault();
        var id = $(this).attr('href');
        var maskHeight = $(document).height();
        var maskWidth = $(window).width();
        $('#mask').css({ 'width': maskWidth, 'height': maskHeight });
        $('#mask').fadeIn(1000);
        $('#mask').fadeTo("slow", 0.8);
        var winH = $(window).height();
        var winW = $(window).width();
        $(id).css('top', winH / 2 - $(id).height() / 2);
        $(id).css('left', winW / 2 - $(id).width() / 2);
        $(id).fadeIn(2000);
    });
    $('.window .close').click(function (e) {
        e.preventDefault();
        $('#mask, .window').hide();
    });
    $('#mask').click(function () {
        $(this).hide();
        $('.window').hide();
    });
    function checkResults() {

        var countRightAnswers = 0;

        for (var numerOfRightAnswer = 0; numerOfRightAnswer < rightAnswers.length; numerOfRightAnswer++) {
            var checkboxs = $('[question="' + numerOfRightAnswer + '"]');

            var isAnswerRight = true;

            for (var answer = 0; answer < checkboxs.length; answer++) {
                if (checkboxs[answer].checked != rightAnswers[numerOfRightAnswer].answers[answer]) {
                    isAnswerRight = false;
                }
            }

            if (isAnswerRight) {
                countRightAnswers++;
            }
        }

        $('[type="checkbox"]').prop('checked', false);
        return countRightAnswers;
    };
});
