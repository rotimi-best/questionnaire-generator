export default () => `
Q56 - Do you have any additional abnormal blood / lab results ? (show)
var: “omc_abnormal_blood_results”
type: radio buttons
icon:doctor-book-kit.svg
Profile title: “Labs: “
options:
label: “No abnormal blood results”
value: “none”
label: “Low WBC count”
value: “low_wbc”
label: “Low neutrophil count”
value: “low_neutrophil_count”
label: “Low potassium levels”
value: “low_potassium”
label: “Low magnesium levels”
value: “low_magnesium”






Q47 - Are you taking any medications unrelated to your cancer? (show)
var: “other_medications”
icon:doctor-book-kit.svg
Profile title: “Other medications: “
type: radio buttons
options:
label: “CYP3A4 inhibitors”
value: “cyp3a4_inhibitors”
label: CYP3A4 inducers
value: cyp3a4_inducers”
label: “Immunosuppressive medications (not for your cancer)”
value: “immunosuppressive_medications”
label: ‘Antiepileptic drugs or as antiseizure drugs”
value: “anticonvulsants”
label: “None of the above”
value: “none”
Info
Title: How do I know if I am taking CYP3A inhibitors or inducers?
Content: These are drugs that can decrease or increase the creation of an important protein called CYP3A. Here you can find a list of frequently used CYP3A inhibitors: ciprofloxacin, erythromycin, diltiazem, fluconazole, verapamil. Some of the commonly used CYP3A inducers are: Carbamazepin, Rifabutin, Rifampin, Nevirapine. Note, these are the generic names of the drugs. They usually appear in parentheses below or next to the brand name (e.g. “DIFLUCAN (fluconazole)”)





Q3 - Are you pregnant (hidden)
var : “is_pregnant”
type : radio buttons
icon: medical-profile.svg
Profile title: “Currently pregnant”
conditions:
if gender = F
if age (calculate date of birth) < 50 (new feature)

options:
label: “Yes”
value: "yes"
label: “No”
value: "no"
info:
title: Applying for a clinical trial while pregnant
content: Many clinical trials do not allow pregnant women to enroll for various reasons, including the safety of the unborn child. Please consult with your doctor to learn more about your options.




Q4 - Are you breastfeeding (hidden)
var : “is_breastfeeding”
type: radio buttons
icon: medical-profile.svg
Profile title: “Currently breastfeeding”
conditions:
if gender = F
if age (calculate date of birth) < 50 (new feature)

options:
label: “Yes”
value: "yes"
label: “No”
value: "no"
info:
title: Applying for a clinical trial while breastfeeding
content: Many clinical trials do not allow women who are breastfeeding to enroll for various reasons, including the safety of the nursing child and the potential impact of the therapy on breast milk. You can decide to skip this question and review available options regardless of whether you are currently nursing or not.
`;