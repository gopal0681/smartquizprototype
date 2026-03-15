import React from "react";
import { useNavigate } from "react-router-dom";
import "../Css/Topics.css";

function Topics() {

  const navigate = useNavigate();
  
  const quant = [
    {name:"Number System", path:"numbersystem", available:true}, 
    {name:"Problem on Ages", path:"ages",available:true},   
    {name:"Probability", path:"probability", available:true},    
    {name:"Time and Work", path:"timework", available:true},
    {name:"Time, Speed and Distance", path:"speed", available:true},
    {name:"Averages, Mixture and Alligations", path:"averages", available:false},
    {name:"Simple and Compound Interest", path:"interest", available:false},
    {name:"Percentages", path:"percentages", available:false},
    {name:"Simplification", path:"simplification", available:false},
    {name:"Algebra", path:"algebra", available:false},
    {name:"Profit, Loss and Partnership", path:"profitloss", available:false},
    {name:"Ratio & Proportion", path:"ratio", available:false},   
    {name:"Permutation & Combination", path:"permutation", available:false},
    {name:"Mensuration", path:"mensuration", available:false},
    {name:"Geometry", path:"geometry", available:false},
    {name:"Data Interpretation", path:"datainterpretation", available:false},
    {name:"Statistics", path:"statistics", available:false},
    {name:"Trigonometry", path:"trigonometry", available:false},
    {name:"Mathematical Inequalities", path:"inequalities", available:false}
  ];

  const reasoning = [
    {name:"AlphaNumeric Series", path:"alphanumeric", available:true},
    {name:"Blood Relations", path:"bloodrelations", available:true},
    {name:"Coding Decoding", path:"coding", available:true},
    {name:"Number Series", path:"numberseries", available:true},
    {name:"Direction Sense", path:"direction", available:true},    
    {name:"Statement & Conclusion", path:"statementconclusion", available:false},
    {name:"Data Sufficiency", path:"datasufficiency", available:false},
    {name:"Syllogism", path:"syllogism", available:false},
    {name:"Seating Arrangement", path:"seating", available:false},
    {name:"Mirror Images", path:"mirror", available:false},
    {name:"Calendar and Clocks", path:"calendar", available:false},
    {name:"Decision Making", path:"decision", available:false},
    {name:"Order and Ranking", path:"ranking", available:false},
    {name:"Patterns", path:"patterns", available:false},
    {name:"Verbal Reasoning", path:"verbalreasoning", available:false},
    {name:"Input Output", path:"inputoutput", available:false},
    {name:"Visual Reasoning", path:"visual", available:false},
    {name:"Puzzles", path:"puzzles", available:false}
  ];

  const verbal = [
    {name:"Synonym Antonym", path:"synonym", available:true},
    {name:"Fill in the blanks", path:"fillblanks", available:true},
    {name:"Find Error", path:"finderror", available:true},
    {name:"Verbal Analogies", path:"analogies", available:true},
    {name:"Sentence Correction", path:"sentence", available:true},
    {name:"Reading Comprehension", path:"reading", available:false},
    {name:"Parajumbles", path:"parajumbles", available:false},
    {name:"Direct Indirect Speech", path:"speech", available:false},
    {name:"Meanings", path:"meanings", available:false},
    {name:"Cloze Test", path:"cloze", available:false},
    {name:"Idioms & Phrases", path:"idioms", available:false},
    {name:"Critical Reasoning", path:"critical", available:false},
    {name:"Alphabet or Word Test", path:"alphabet", available:false},
    {name:"One Word Substitution", path:"oneword", available:false},
    {name:"Active & Passive Voice", path:"activepassive", available:false},
    {name:"Spelling", path:"spelling",available:false}
  ];


  const renderList = (topics) => (
    <ul className="topic-list">
      {topics.map((topic,index)=>(
        <li
          key={index}
          className={!topic.available ? "disabled-topic" : ""}
          onClick={() => {
            if(topic.available){
              navigate(`/quiz/${topic.path}`)
            }
          }}
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