import React from 'react';
import { ConversationalForm } from 'conversational-form';

export default class Form extends React.Component {
  constructor(props) {
    super(props);
    this.formFields = [
      {
        'tag': 'fieldset',
        'cf-questions': 'Que veulent-ils?',
        'id': 'question1',
        'children': [
          {
            'tag': 'input',
            'type': 'radio',
            'name': 'question1',
            'value': 'engage',
            'cf-label': 'Je m engage'
          },
          {
            'tag': 'input',
            'type': 'radio',
            'name': 'question1',
            'value': 'interoge',
            'cf-label': 'Je m integore'
          },
          {
            'tag': 'input',
            'type': 'radio',
            'name': 'question1',
            'value': 'inspire',
            'cf-label': 'Je m inspire'
          },
          {
            'tag': 'input',
            'type': 'radio',
            'name': 'question1',
            'value': 'outils',
            'cf-label': 'J ai besoin d outils'
          },
        ]
      },

      {
        'tag': 'fieldset',
        'cf-questions': 'Quel theme veulent-ils?',
        'id': 'question2',
        'children': [
          {
            'tag': 'input',
            'type': 'radio',
            'name': 'theme',
            'cf-conditional-question1': 'engage||interoge||inspire',
            'value': 'theme1',
            'cf-label': 'Theme 1'
          },
          {
            'tag': 'input',
            'type': 'radio',
            'name': 'theme',
            'cf-conditional-question1': 'engage||interoge||inspire',
            'value': 'theme2',
            'cf-label': 'Theme 2'
          },
        ]
      },

      {
        'tag': 'fieldset',
        'cf-questions': 'Duree?',
        'id': 'question3',
        'children': [
          {
            'tag': 'input',
            'type': 'radio',
            'name': 'duree',
            'cf-conditional-question1': 'engage||interoge',
            'value': 'appels',
            'cf-label': 'Appels'
          },
          {
            'tag': 'input',
            'type': 'radio',
            'name': 'duree',
            'cf-conditional-question1': 'engage||interoge',
            'value': 'events',
            'cf-label': 'Events'
          },
          {
            'tag': 'input',
            'type': 'radio',
            'name': 'duree',
            'cf-conditional-question1': 'engage||interoge',
            'value': 'projects',
            'cf-label': 'Projects'
          },
          {
            'tag': 'input',
            'type': 'radio',
            'name': 'duree',
            'cf-conditional-question1': 'engage||interoge',
            'value': 'gesets',
            'cf-label': 'Gesets'
          },
        ]
      },

      {
        'tag': 'fieldset',
        'cf-questions': 'Canton?',
        'id': 'question4',
        'children': [
          {
            'tag': 'input',
            'type': 'radio',
            'name': 'canton',
            'cf-conditional-question1': 'engage',
            'value': 'fribourg',
            'cf-label': 'Fribourg'
          },
          {
            'tag': 'input',
            'type': 'radio',
            'name': 'canton',
            'cf-conditional-question1': 'engage',
            'value': 'neuchatel',
            'cf-label': 'Neuchatel'
          },
          {
            'tag': 'input',
            'type': 'radio',
            'name': 'canton',
            'cf-conditional-question1': 'engage',
            'value': 'bern',
            'cf-label': 'Bern'
          },
          {
            'tag': 'input',
            'type': 'radio',
            'name': 'canton',
            'cf-conditional-question1': 'engage',
            'value': 'lausanne',
            'cf-label': 'Lausanne'
          },
        ]
      },

      {
        'tag': 'cf-robot-message',
        'name': 'outils-fin',
        'cf-conditional-question1': 'outils',
        'cf-questions': 'Fin outils'
      },
      {
        'tag': 'cf-robot-message',
        'name': 'outils-fin',
        'cf-conditional-question1': 'inspire',
        'cf-questions': 'Fin inspire'
      },
      {
        'tag': 'cf-robot-message',
        'name': 'outils-fin',
        'cf-conditional-question1': 'interoge',
        'cf-questions': 'Fin interoge'
      },
      {
        'tag': 'cf-robot-message',
        'name': 'outils-fin',
        'cf-conditional-question1': 'engage',
        'cf-questions': 'Fin engage'
      },

      {
        'tag': 'cf-robot-message',
        'cf-questions': "Question1: {question1}&&Question2: {question2}&&Question3: {question3}&&Question4: {question4}"
      },
    ];
    
    this.submitCallback = this.submitCallback.bind(this);
  }
  
  componentDidMount() {
    this.cf = ConversationalForm.startTheConversation({
      options: {
        submitCallback: this.submitCallback,
        preventAutoFocus: true,
        // loadExternalStyleSheet: false
      },
      tags: this.formFields
    });
    this.elem.appendChild(this.cf.el);
  }
  
  submitCallback() {
    var formDataSerialized = this.cf.getFormData(true);
    console.log("Formdata, obj:", formDataSerialized);
    this.cf.addRobotChatResponse("You are done. Check the dev console for form data output.")
  }
  
  render() {
    return (
      <div>
        <div
          ref={ref => this.elem = ref}
        />
      </div>
    );
  }
}