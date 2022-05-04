import React from 'react'
import { ConversationalForm } from 'conversational-form'
import data from './anousdejouer.json'
import Result from './Result'

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

// console.log('sections_grouped', sections_grouped)

let labels_question3 = [
  {
    no: '1',
    title: 'Qu’une seule fois',
    sections: ['5']
  },
  {
    no: '2',
    title: 'De manière régulière',
    sections: sections_grouped.filter(group => group.no === "3")[0].sections.filter(s => s !== '5')
  },
  {
    no: '3',
    title: 'Peu importe',
    sections: ['*']
  }
]

let labels_question5 = [
  {
    no: '1',
    title: 'de l’aide pour mon projet',
    sections: ['10']
  },
  {
    no: '2',
    title: 'de l’aide pour mon événement',
    sections: ['10']
  },
  {
    no: '3',
    title: 'un soutien financier',
    sections: ['10']
  },
  {
    no: '4',
    title: 'un espace',
    sections: ['10']
  },
  {
    no: '5',
    title: 'du matériel',
    sections: ['10']
  }
]

// console.log('labels_question3', labels_question3)

let i18n = {
  'Boîte à outils': 'J‘ai besoin d‘outils !​',
  'Je m&#8217;inspire': 'Je veux m‘inspirer de projets déjà existants !',
  'Je m&#8217;engage': 'Je veux m‘engager !​',
  'Je m&#8217;interroge': 'Je m’interroge sur mes valeurs et mes combats !',
  'Canton de Genève': 'Genève'
}

// console.log('i18n', i18n)

let greeting = 'Bienvenue sur anousdejouer.ch !&&La plateforme des projets et associations de jeunes. Inspire-toi, interroge-toi, outille-toi et engage-toi ici et maintenant !'
let message1 = {
  'tag': 'cf-robot-message',
  'cf-questions': greeting,
}

let question1 = {
  'tag': 'fieldset',
  'cf-questions': 'Qu’est-ce que tu veux faire ? Que cherches-tu ?',
  'id': 'question1',
  'children': data.sections.filter(s => ['1', '2', '3', '4'].includes(s.no)).map(section => {
    let label = i18n[section.title]
    return {
      'tag': 'input',
      'type': 'radio',
      'name': 'question1',
      'value': section.no,
      'cf-label': label || section.title
    }
  })
}

// console.log('question1', question1)

let question2 = {
  'tag': 'fieldset',
  'cf-questions': 'Quel domaine t‘intéresse ?',
  'id': 'question2',
  'children': data.themes.map(theme => {
    return {
      'tag': 'input',
      'type': 'radio',
      'name': 'question2',
      'cf-conditional-question1': '1||2||3',
      'value': theme.no,
      'cf-label': theme.title
    }
  })
}

// console.log('question2', question2)

let question3 = {
  'tag': 'fieldset',
  'cf-questions': 'Aimerais-tu t’engager une seule fois ou de manière régulière ?',
  'id': 'question3',
  'children': labels_question3.map(label => {
    return {
      'tag': 'input',
      'type': 'radio',
      'name': 'question3',
      'cf-conditional-question1': '3',
      'value': label.no,
      'cf-label': label.title
    }
  })
}

// console.log('question3', question3)

let question4 = {
  'tag': 'fieldset',
  'cf-questions': 'Dans quel canton aimerais-tu t’engager ?',
  'id': 'question4',
  'children': data.cantons.filter(c => c.articles.length > 1).map(canton => {
    return {
      'tag': 'input',
      'type': 'radio',
      'name': 'question4',
      'cf-conditional-question1': '3',
      'value': canton.no,
      'cf-label': i18n[canton.title] || canton.title
    }
  })
}

// console.log('question3', question3)

let form_fields = [
  message1,
  question1,
  question2,
  question3,
  question4,

  // {
  //   'tag': 'cf-robot-message',
  //   'cf-questions': "Question1: {question1}&&Question2: {question2}&&Question3: {question3}&&Question4: {question4}"
  // },
]

export default class Form extends React.Component {
  constructor(props) {
    super(props)
    this.formFields = form_fields
    this.submitCallback = this.submitCallback.bind(this)
    this.state = {'showResults': false}
  }
  
  componentDidMount() {
    this.cf = ConversationalForm.startTheConversation({
      options: {
        submitCallback: this.submitCallback,
        preventAutoFocus: true,
        // loadExternalStyleSheet: false
      },
      tags: this.formFields
    })
    this.elem.appendChild(this.cf.el)
  }
  
  submitCallback() {
    var response = this.cf.getFormData(true)

    let question1 = response.question1[0]
    let question2 = response.question2[0]
    let question3 = response.question3[0]
    let question4 = response.question4[0]
    // console.log("Response:", question1, question2, question3, question4)

    let articles = []

    // Filter question1
    if (question1 !== "") {
      let sections_filtered = sections_grouped.filter(s => s.no === question1)[0].sections
      articles = data.articles.filter(a => sections_filtered.includes(a.section))
      // console.log("Articles1:", articles)
    }

    // Filter question2
    if (question2 !== "") {
      let theme_articles = data.themes.filter(t => t.no === question2)[0].articles
      articles = articles.filter(a => theme_articles.includes(parseInt(a.no)))
      // console.log("Articles2:", articles, theme_articles)
    }

    // Filter question3
    if (question3 !== "") {
      let label_sections = labels_question3.filter(l => l.no === question3)[0].sections
      if (label_sections[0] !== '*'){
        articles = articles.filter(a => label_sections.includes(a.section))
      }
      // console.log("Articles3:", articles)

    }

    // Filter question4
    if (question4 !== "") {
      let cantons_articles = data.cantons.filter(c => c.no === question4)[0].articles
      articles = articles.filter(a => cantons_articles.includes(parseInt(a.no)))
      // console.log("Articles4:", articles, cantons_articles)
    }

    // let articles_grouped = articles.reduce()
    // console.log("Articles:", articles)
    
    this.cf.addRobotChatResponse(`Vous avez terminé. Nous avons trouvé ${articles.length} articles à afficher.`)

    setTimeout(function(){
      this.setState({showResults: articles})
    }.bind(this),2000);
  }
  
  render() {
    const showResults = this.state.showResults;
    // console.log(showResults)

    if (showResults) {
      return <div>
        <div style={{display: 'none'}}
          ref={ref => this.elem = ref}
        />
        <Result articles={showResults} />
      </div>
    } else {
      return <div>
        <div
          ref={ref => this.elem = ref}
        />
      </div>
    }
  }
}