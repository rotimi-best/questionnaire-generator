const defaultQuestion = {
  q: 'Q',
  id: 'ID',
  type: 'RADIO',
  bgIcon: 'i',
  order: 0,
  title: '',
  subtitle: '',
  info: {
    title: '',
    content: ''
  },
  options: [
    {
      label: '',
      value: '',
    },
  ],
  conditions: [],
};

const removeDoubleQuotes = st => {
  return st.replace('“', '')
    .replace('”', '')
    .replace('"', '')
    .replace('"', '')
    .trim();
}

// TODO Match background icons
/*
  Background Icons: ( icons folder )
  cancer-research
  clock-brain-pills
  doctor-book-kit
  globe
  medical-profile
  medical-report
  molecular
  plane-hospital-pills
  treatment
  user
*/

// TODO Match type like
/*
  Question Types:
  date picker
  radio buttons (single select)
  multi checkboxes (multiple selects)
  drop down (single select)
  number input
*/
export const formatQuestions = data => {
  const lines = data
    .split('\n')
    .filter(val => !!val
      ? val.trim()
      : false
    );
  // console.log('lines', lines)
  const questions = [];
  let question = defaultQuestion;
  let options = [];
  let first = true;

  for (const line of lines) {
    const qMatchRegex = /^q\d+[\w]*/i;
    const matchTitle = line.trim().match(qMatchRegex);
    const matchSubTitle = /^(?:Subhead|subtitle):(.{0,})/ig.exec(line);
    const matchVar = /^var:(.{0,})/ig.exec(line);
    const matchIcon = /^icon:(.{0,})/ig.exec(line);
    // const matchOptions = /^option/ig.exec(line);
    const matchLabel = /^label:(.{0,})/ig.exec(line);
    const matchValue = /^value:(.{0,})/ig.exec(line);
    // const matchCondtions = /^value:(.{0,})/ig.exec(line);
    const matchInfoTitle = /^title:(.{0,})/ig.exec(line);
    const matchInfoContent = /^content:(.{0,})/ig.exec(line);

    if (!matchLabel && !matchValue && options.length) {
      // console.log('done with options', options)
      question.options = options;
      options = [];
    }

    // That means finished with previous questions
    if (matchTitle) {
      console.log('matched title', matchTitle)
      if (question.title.length && !first) {
        // Push finished question
        questions.push(question);
        // Start a new question
        question = {
          q: '',
          id: '',
          type: '',
          bgIcon: '',
          order: 0,
          title: '',
          subtitle: '',
          info: {
            title: '',
            content: ''
          },
          options: [
            {
              label: '',
              value: '',
            },
          ],
          conditions: [],
        };
      } else if (first) {
        first =  !first;
      }

      question.q = matchTitle[0];
      question.title = line.replace(qMatchRegex, '')
        .trim()
        .replace(/^-/, '')
        .trim()
        .replace(/\(show\)/i, '')
        .replace(/\(hidden\)/i, '')
        .trim();
    } else if (matchSubTitle) {
      const subtitle = matchSubTitle[1].trim().replace('(hidden)', '')
      question.subtitle = question.subtitle.length
        ? question.subtitle + ' ' + subtitle
        : subtitle;
    } else if (matchVar) {
      question.id = `ID.${removeDoubleQuotes(matchVar[1].trim())}`;
    } else if (matchIcon) {
      question.bgIcon = `i.${matchIcon[1].trim()}`;
    } else if (matchLabel) {
      options.push({
        label: removeDoubleQuotes(matchLabel[1].trim())
      })
    } else if (matchValue) {
      const value = removeDoubleQuotes(matchValue[1].trim());
      options = options.map((option, i, array) => {
        if (i === array.length - 1) {
          return {
            ...option,
            value
          }
        }

        return option
      })
    } else if (matchInfoTitle) {
      question.info.title = matchInfoTitle[1].trim();
    } else if (matchInfoContent) {
      question.info.content = matchInfoContent[1].trim();
    }
  }

  return questions
};