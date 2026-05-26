const {GoogleGenAI } = require("@google/genai");
const z = require('zod');
const {zodToJsonSchema } = require('zod-to-json-schema');

const ai = new GoogleGenAI({
  apiKey: process.env.GOOGLE_GENAI_API_KEY,
});


const interviewReportSchema = z.object({

  matchScore: z.number().describe("A score between 0 and 100 indicating how well the candidate matches the job requirements based on the analysis of the resume, self-description and job description provided by the candidate").describe("The overall match score for the candidate with respect to the job requirements, based on the analysis of the resume, self-description and job description provided by the candidate"),

  technicalQuestions: z.array(z.object({
    question: z.string().describe("The technical question can be asked in the interview"),
    intention: z.string().describe("The intention of interview behind asking this question"),
    answer: z.string().describe("How to answer this question, what points to cover, what approach to take etc")
  })).describe("List of technical questions that can be asked in the interview, along with the intention behind asking those questions and how to answer them"),

  behavioralQuestions: z.array(z.object({
    question: z.string().describe("The behavioral question can be asked in the interview"),
    intention: z.string().describe("The intention of interview behind asking this question"),
    answer: z.string().describe("How to answer this question, what points to cover, what approach to take etc") 
  })).describe("List of behavioral questions that can be asked in the interview, along with the intention behind asking those questions and how to answer them"),
  
  skillGaps: z.array(z.object({
    skill: z.string().describe("The skill gap that the candidate has with respect to the job requirements"),
    severity: z.enum(["low", "medium", "high"]).describe("The severity of the skill gap, whether it is low, medium or high").describe("List of skill gaps that the candidate has with respect to the job requirements, along with the severity of those skill gaps"),
  })),

  preparationPlan: z.array(z.object({
    day: z.number().describe("The day number of the preparation plan"),
    focus: z.string().describe("The focus of the preparation for that day"),
    tasks: z.array(z.string()).describe("The tasks to be done for the preparation on that day").describe("A day-wise preparation plan for the candidate to prepare for the interview, based on the job description, resume and self-description provided by the candidate"),
  }))

})

async function generateInterviewReport({resume, selfDescription, jobDescription}){

  const prompt = `Generate a comprehensive interview preparation report for a candidate based on the following information:

                    Job Description: ${jobDescription}
                    Resume: ${resume}
                    Self Description: ${selfDescription}`


  const response = await ai.models.generateContent({
    model: "gemini-3-flash-preview",
    contents: prompt,
    config:{
      responseMimeType: "application/json",
      responseSchema: zodToJsonSchema(interviewReportSchema),

    },
})

  return JSON.parse(response.text)
}


module.exports = generateInterviewReport