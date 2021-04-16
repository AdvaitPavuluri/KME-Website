(function() {
  var questions = [{
    question: "What are some symptoms of kidney disease?",
    choices: ["Lack of energy", "Poor apetite", "Muscle cramping", "All of the above"],
    correctAnswer: 3
  }, {
    question: "How many kidneys do most people have?",
    choices: ["One", "Two", "Three", "Four"],
    correctAnswer: 1
  }, {
    question: "Who are at risk for getting kidney disease?",
    choices: ["People with diabetes", "People with high blood pressure", "People with heart disease", "All of the above"],
    correctAnswer: 3
  }, {
    question: "What dietary restrictions are usually recommended for people with CKD?",
    choices: ["Potassium", "Sodium", "High amounts of protein", "All of the above"],
    correctAnswer: 3
  }];
  
  var counter = 0; //question number
  var choices = []; //user choice array
  var quiz = $('#quiz'); //div for quiz
  
  // show first question
  showNextQuestion();
  
  // What to do when 'next' is clicked
  $('#next').on('click', function (e) {
    e.preventDefault();
    
    // Suspend click listener during fade animation
    if(quiz.is(':animated')) {        
      return false;
    }
    choose();
    
    // If user clicks without selecting anything popup an alert
    if (isNaN(choices[counter])) {
      alert('You can not go to next question without selecting an answer!');
    } else {
      counter++;
      showNextQuestion();
    }
  });
  
  // When 'prev' is clicked
  $('#prev').on('click', function (e) {
    e.preventDefault();
    
    if(quiz.is(':animated')) {
      return false;
    }
    choose();
    counter--;
    showNextQuestion();
  });
  
  // Click handler for the 'Start Over' button
  $('#start').on('click', function (e) {
    e.preventDefault();
    
    if(quiz.is(':animated')) {
      return false;
    }
    counter = 0;
    choices = [];
    showNextQuestion();
    $('#start').hide();
  });
  
  // Activate on hovering over buttons, deactivate when leaving
  $('.button').on('mouseenter', function () {
    $(this).addClass('active');
  });
  $('.button').on('mouseleave', function () {
    $(this).removeClass('active');
  });
  
  // Creates and returns the div that contains the questions and 
  // the answer selections
  function makeQuestion(index) {
    var qElement = $('<div>', {
      id: 'question'
    });
    
    var header = $('<h2>Question - ' + (index + 1) + '</h2>');
    qElement.append(header);
    
    var question = $('<p>').append(questions[index].question);
    qElement.append(question);
    
    var radioButtons = createRadios(index);
    qElement.append(radioButtons);
    
    return qElement;
  }
  
  // Creates a list of the answer choices as radio inputs
  function createRadios(index) {
    var radioList = $('<ul>');
    var item;
    var input = '';
    for (var i = 0; i < questions[index].choices.length; i++) {
      item = $('<li>');
      input = '<input type="radio" name="answer" value=' + i + ' />';
      input += questions[index].choices[i];
      item.append(input);
      radioList.append(item);
    }
    return radioList;
  }
  
  // read the answer from user and save it in the choices array
  function choose() {
    choices[counter] = +$('input[name="answer"]:checked').val();
  }
  
  // Shows next requested element
  function showNextQuestion() {
    quiz.fadeOut(function() {
      $('#question').remove();
      
      if(counter < questions.length){
        var nextQuestion = makeQuestion(counter);
        quiz.append(nextQuestion).fadeIn();
        if (!(isNaN(choices[counter]))) {
          $('input[value='+choices[counter]+']').prop('checked', true);
        }
        
        // Dont show prev button if first question
        if(counter === 1){
          $('#prev').show();
        } else if(counter === 0){
          
          $('#prev').hide();
          $('#next').show();
        }
      }else {
        var scoreElem = showscore();
        quiz.append(scoreElem).fadeIn();
        $('#next').hide();
        $('#prev').hide();
        $('#start').show();
      }
    });
  }
  
  // Compute score and return the object to be displayed
  function showscore() {
    var score = $('<p>',{id: 'question'});  //make a paragram element
    
    var numCorrect = 0;
    //calculate score
    for (var i = 0; i < choices.length; i++) {
      if (choices[i] === questions[i].correctAnswer) {
        numCorrect++;
      }
    }
    //make a sentence and append
    score.append('You got ' + numCorrect + ' questions out of ' +
                 questions.length + ' right!!!');
    return score;
  }
})();