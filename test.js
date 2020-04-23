const data = `
Q6a- What is the level of M-protein in your blood (in g/dL)?
Subhead: Note: Please look at the units. If the units next the number are g/L, please divide the value by 10 and then fill it in (see below for an example)" (hidden)
var: "serum_mprotein_level"
icon:cancer-research.svg
options: [number]

Conditions:
If Q6 "has_mprotein" !== "no"

info:
title: Where can I find my M-protein value?
content: "On your last CBC (Complete Blood Count) there is a category called "M-protein". Next to this you can find the unit. If it's in g/dL, please fill in the value. If it's in g/L, please divide the value by 10 and then fill it in." For example, if you have M protein levels of 7g/dL, please insert "7". If your levels are 60g/L, divide 60 by 10 (=6) and insert the value ("6") to the box above



 Q6b- If there is a specific subtype of M-protein (Ig) next to its levels or elsewhere in your report, please specify which one below"  (hidden)
var: "ig_subtype"
type: radio buttons
icon:cancer-research.svg
options:
label: "IgA"
value: "iga"
label: "IgG"
value: "igg"
label: "IgM"
value: "igm"
label: "IgD"
value: "igd"
label: "I’m not sure"
Value: "not_sure"

Conditions:
If Q6 "has_mprotein" !== "no"
info:
title: Where can I find this information?
Content: On your last CBC (Complete Blood Count) there is a title called "Immunofixation, Serum". Under the title, there are values for IgA, IgG IgD and IgM. If one of them is higher than the normal range/reference interval (found on the right column), please select the specific Ig (Immunoglobulin) that is higher.


 Q6c-  Is your M-protein level in your urine lower or higher than 200 mg/24h? (hidden)
var: "urine_mprotein_level"
icon:cancer-research.svg
options:
label: "Lower"
value: "lower_than_200"
label: "Higer (or equal)"
value: "highr_than_200"

Conditions:
If Q6 "has_mprotein" = (ii) "yes_blood_and_urine"



Q6d- Are free light chains (sometimes called "Bence Jones protein" or "BJP") detected in your blood/serum? (hidden)
var: "has_serum_flc"
type: radio buttons
Icon:treatment.svg
options:
label: "Yes"
value: "yes"
label: "No"
value: "no"
Label: "I am not sure"
value: "not_sure"

info:
title: What are "free light chains" and how can I find this answer?
Content: Myeloma cells tend to make those "light chains" in excess to form a complete M-protein. This excess of "l free light chains" can be detected in your blood. There are two categories of light chains: Kappa (K) and Lambda (L). In your medical record you will find this information in the section that may be called "Serum free K+L Lt Chains" or a variation of that name. If there are numbers next to the light chain category it means that they are present and you can answer "yes" to this question
Conditions:
If Q6 "has_mprotein" = "no"



Q6e-  Are the levels of either of your "free light chains"  (can be  either "kappa" (K) or "lambda" (L)) in your blood/serum lower or higher than 100 mg/L?
Subhead: Note:  In some medical reports the levels can also be presented as  mg/dL. In this case, answer "yes" if your levels are higher than 10 mg/dL (hidden)
var: "serum_kappa_flc_level"
type: radio buttons
Icon:treatment.svg
options:
label: "Lower"
value: "lower_than_100"
label: "Higher (or equal)"
value: "higher_than_100"

info:
title: What are "free kappa light chains" and how can I find this answer?
Content: There are two categories of "serum free light chains": Kappa (K) and Lambda (L). In your medical report you will find this information in the section called something like "Free K/L Lt Chains". If there are numbers next to the "Free kappa light chains" category please enter them here. We are not asking about the kappa/lambda ratio here. If you are not sure, skip this question

Conditions:
If Q6d "has_serum_flc" = (i)"yes"
`;

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

const formatQuestions = data => {
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
    const matchSubTitle = /^Subhead:(.{0,})/ig.exec(line);
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
        .replace(/\(show\)/i, '');
    } else if (matchSubTitle) {
      question.subtitle = matchSubTitle[1].trim().replace('(hidden)', '')
    } else if (matchVar) {
      // console.log('matchVar', matchVar)
      question.id = matchVar[1].trim();
    } else if (matchIcon) {
      question.bgIcon = matchIcon[1].trim();
    } else if (matchLabel) {
      options.push({
        label: matchLabel[1].trim().replace('"', '').replace('"', '')
      })
    } else if (matchValue) {
      const value = matchValue[1].trim().replace('"', '').replace('"', '');
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

console.log(formatQuestions(data))