// attention game support vectors
const color_att = ["red","blue","orange","green","yellow","pink","white","purple","brown","gray"];
const city_att = ["Seattle", "Dallas", "Denver","Detroit","Miami","Atlanta","Chicago","Portland","Boston","Filadelfia"];
const animal_att = ["dog","cat","elephant","snake","lion","mouse","tiger","pig","cow","sheep"];
const profession_att = ["doctor","lawyer","professor","engineer","farmer","plumber","politician","actor","chef","nurse"];
const sport_att = ["basketball","football","skating","rugby","volleyball","tennis","baseball","hockey","soccer","boxing"];

const question_orientation =    ['What year is it?', 
                                'What month is it ?', 
                                'What day of week is it?',
                                'What number of day is it?',
                                'Now tell me what time is it?',
                                'Where do you live (address)?',
                                'What country do you live?',
                                'What is your postal code?'];
function start (handlerInput) {
    const {attributesManager} = handlerInput;
    const sessionAttributes = attributesManager.getSessionAttributes();
            sessionAttributes.classification_state = "ATTENTION";
            const speakOutput = ` <amazon:emotion name="excited" intensity="low"> Thank you ${sessionAttributes.Name}.</amazon:emotion> `;
            const random_att = [color_att[Math.floor(Math.random()*color_att.length)],city_att[Math.floor(Math.random()*city_att.length)],animal_att[Math.floor(Math.random()*animal_att.length)],profession_att[Math.floor(Math.random()*profession_att.length)],sport_att[Math.floor(Math.random()*sport_att.length)]];
            sessionAttributes.random_vect_att = random_att;
            let string_att = " ";
                for (let value of random_att) {
                    string_att = string_att + value + ". ";
                }
            sessionAttributes.string_att = string_att;
            sessionAttributes.score_attention = 0;
            sessionAttributes.first_time_flag = 0;
            handlerInput.attributesManager.setSessionAttributes(sessionAttributes)
            const speakOutput1 ='<break time="2s"/>  Lets start with the attention part. <break time="1s"/>  I will tell you 5 words, try to remember them.';
            const speakOutput2 = ' The words are: <break time="1s"/>' + string_att;
    return {speakOutput, speakOutput1, speakOutput2};
}

function check(handlerInput, user_slot) {
    
    const {attributesManager} = handlerInput;
    const sessionAttributes = attributesManager.getSessionAttributes();
    const check_vector = sessionAttributes.random_vect_att;
    sessionAttributes.slots = user_slot;
    for (let word of check_vector) {   
        for (let user_word of user_slot) {
            if (word === user_word){ sessionAttributes.score_attention = sessionAttributes.score_attention+1; }
        }
    }
    
    handlerInput.attributesManager.setSessionAttributes(sessionAttributes);   
}

function newGame (handlerInput) {
    const {attributesManager} = handlerInput;
    const sessionAttributes = attributesManager.getSessionAttributes();
        sessionAttributes.classification_state = "ORIENTATION";
        const speakOutput = ` <amazon:emotion name="excited" intensity="medium">Thank you. Your score in Attention is ${sessionAttributes.score_attention} .</amazon:emotion>`;
        sessionAttributes.counter_orientation = 0;
        sessionAttributes.score_orientation = 0;
        handlerInput.attributesManager.setSessionAttributes(sessionAttributes);
        const speakOutput1 = '<break time="1s"/> Now, next question is: '+ ' ' +question_orientation[sessionAttributes.counter_orientation];
    
    return {speakOutput, speakOutput1};
}

module.exports = {check, start, newGame}