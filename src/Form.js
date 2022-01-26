import React from 'react';
import { ConversationalForm } from 'conversational-form';
import data from './anousdejouer.json';

// Data processing

let sections_grouped = []
let in_section = null

// Loop section
data.sections.forEach(current_section => {
  in_section = sections_grouped.filter(group => group.sections.includes(current_section.in_section))
  // If section is in sections append no
  if (!!in_section.length) {
    sections_grouped.forEach(group => {
      if (group.no === in_section[0].no) {
        group.sections.push(current_section.no)
      }
    })

  // Else create new section
  } else {
    sections_grouped.push(
      {
        no: current_section.no,
        sections: [current_section.no]
      }
    )
  }
})

console.log('sections_grouped', sections_grouped)

let labels_question3 = [
  {
    no: '1',
    label: 'Qu’une seule fois',
    sections: '5'
  },
  {
    no: '2',
    label: 'Plus longtemps',
    sections: sections_grouped.filter(group => group.no === "3")[0].sections.filter(s => s !== '5')
  },
  {
    no: '3',
    label: 'Qu’une seule fois',
    sections: '3'
  }
]

console.log('labels_question3', labels_question3)

let i18n = {
  'Boîte à outils': '...'
}

console.log('i18n', i18n)

let question1 = {
  'tag': 'fieldset',
  'cf-questions': 'Qu‘est-ce que tu veux faire?',
  'id': 'question1',
  'children': data.sections.filter(s => ['1', '2', '3', '4'].includes(s.no)).map(section => {
    console.log(section)
    return {
      'tag': 'input',
      'type': 'radio',
      'name': 'question1',
      'value': section.no,
      'cf-label': section.title
    }
  })
}

console.log('question1', question1)

let form_fields = [
  question1,

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
]

export default class Form extends React.Component {
  constructor(props) {
    super(props);
    this.formFields = form_fields;
    
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