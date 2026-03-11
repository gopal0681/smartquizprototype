import React from "react";
import { useNavigate } from "react-router-dom";
import "../Css/Topics.css";

function Topics() {

  const navigate = useNavigate();
  
  const quant = [
    {name:"Percentages", path:"percentages"},
    {name:"Ratio & Proportion", path:"ratio"},
    {name:"Profit, Loss and Partnership", path:"profitloss"},
    {name:"Averages, Mixture and Alligations", path:"averages"},
    {name:"Time and Work", path:"timework"},
    {name:"Time, Speed and Distance", path:"speed"},
    {name:"Simple and Compound Interest", path:"interest"},
    {name:"Number System", path:"numbersystem"},
    {name:"Simplification", path:"simplification"},
    {name:"Algebra", path:"algebra"},
    {name:"Problem on Ages", path:"ages"},
    {name:"Permutation & Combination", path:"permutation"},
    {name:"Probability", path:"probability"},
    {name:"Mensuration", path:"mensuration"},
    {name:"Geometry", path:"geometry"},
    {name:"Data Interpretation", path:"datainterpretation"},
    {name:"Statistics", path:"statistics"},
    {name:"Trigonometry", path:"trigonometry"},
    {name:"Mathematical Inequalities", path:"inequalities"}
  ];

  const reasoning = [
    {name:"AlphaNumeric Series", path:"alphanumeric"},
    {name:"Blood Relations", path:"bloodrelations"},
    {name:"Coding Decoding", path:"coding"},
    {name:"Data Sufficiency", path:"datasufficiency"},
    {name:"Direction Sense", path:"direction"},
    {name:"Mirror Images", path:"mirror"},
    {name:"Number Series", path:"numberseries"},
    {name:"Statement & Conclusion", path:"statementconclusion"},
    {name:"Syllogism", path:"syllogism"},
    {name:"Seating Arrangement", path:"seating"},
    {name:"Calendar and Clocks", path:"calendar"},
    {name:"Decision Making", path:"decision"},
    {name:"Order and Ranking", path:"ranking"},
    {name:"Patterns", path:"patterns"},
    {name:"Verbal Reasoning", path:"verbalreasoning"},
    {name:"Input Output", path:"inputoutput"},
    {name:"Visual Reasoning", path:"visual"},
    {name:"Puzzles", path:"puzzles"}
  ];

  const verbal = [
    {name:"Synonym Antonym", path:"synonym"},
    {name:"Fill in the blanks", path:"fillblanks"},
    {name:"Find Error", path:"finderror"},
    {name:"Verbal Analogies", path:"analogies"},
    {name:"Sentence Correction", path:"sentence"},
    {name:"Reading Comprehension", path:"reading"},
    {name:"Parajumbles", path:"parajumbles"},
    {name:"Direct Indirect Speech", path:"speech"},
    {name:"Meanings", path:"meanings"},
    {name:"Cloze Test", path:"cloze"},
    {name:"Idioms & Phrases", path:"idioms"},
    {name:"Critical Reasoning", path:"critical"},
    {name:"Alphabet or Word Test", path:"alphabet"},
    {name:"One Word Substitution", path:"oneword"},
    {name:"Active & Passive Voice", path:"activepassive"},
    {name:"Spelling", path:"spelling"}
  ];


  const renderList = (topics) => (
    <ul className="topic-list">
      {topics.map((topic,index)=>(
        <li
          key={index}
          onClick={()=>navigate(`/quiz/${topic.path}`)}
        >
          {index+1}. {topic.name}
        </li>
      ))}
    </ul>
  );

  return (

    <div className="topics-container">

      <h1 className="main-title">
        Practice Aptitude, Reasoning & Verbal Questions
      </h1>
       <h2>Smart Quiz Questions & Answers</h2>
        <p>
            Explore thousands of smart quiz questions with answers and clear explanations 
            across a wide range of topics including logic, numbers, language, general knowledge, 
            puzzles, and more.
            Whether you're learning something new, challenging your brain, or just having fun, 
            our quizzes are designed to test your thinking, improve your knowledge, and keep 
            you engaged.
        </p>

      <div className="topics-grid">

        <div className="topic-card">
          <h2>Quantitative Aptitude</h2>
          {renderList(quant)}
        </div>

        <div className="topic-card">
          <h2>Logical Reasoning</h2>
          {renderList(reasoning)}
        </div>

        <div className="topic-card">
          <h2>Verbal Ability</h2>
          {renderList(verbal)}
        </div>

      </div>

    </div>

  );
}

export default Topics;