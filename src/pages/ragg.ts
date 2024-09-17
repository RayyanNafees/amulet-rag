import {} from 'node:os'
import { PromptTemplate } from '@langchain/core/prompts'
import {RecursiveCharacterTextSplitter} from '@langchain/textsplitters'
import { Chroma } from '@langchain/community/vectorstores/chroma'

import { ChatGoogleGenerativeAI } from '@langchain/google-genai'
import { GoogleGenerativeAIEmbeddings } from '@langchain/google-genai'


const model = ChatGoogleGenerativeAI.(
  new GoogleGenerativeAIEmbeddings({
    apiKey: import.meta.env.GOOGLE_API_KEY,
    modelName: "embedding-001",
  }),
  {
    model: 'gemini-pro',
    temperature: 0.2,
    convertSystemMessageToHuman: true,
  },
)

export const ask = async (question: string) => {
  const context = await loadContext()
  const qaChain = RetrievalQAChain.fromLLM(model, context, {
    prompt: qaChainPromptTemplate,
  })
  const result = await qaChain.call({ query: question })
  return result.text
}

const qaChainPromptTemplate = PromptTemplate.fromTemplate(
  `Use the following pieces of context to answer the question but if i ask something else related to this then also answer that. Always be kind after responding.
  {context} 

/*
from langchain.chains.question_answering import load_qa_chain
from langchain_community.document_loaders import PyPDFLoader
from langchain.chains import RetrievalQA
from langchain_google_genai import GoogleGenerativeAIEmbeddings, ChatGoogleGenerativeAI
*/
