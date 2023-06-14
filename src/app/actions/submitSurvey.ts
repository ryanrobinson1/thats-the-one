"use server";

import prisma from "../lib/prisma";
import { SurveyForm } from "../survey/page";
import { uuid } from "uuidv4";

export default async function apiHandleSubmitSurvey(data: SurveyForm | undefined) {
  if (!data) return null;

  const questions = Object.keys(data);

  const id = uuid();

  for await (const question of questions) {
    await prisma.survey.create({
      data: {
        question_description: data[question].description,
        question_title: data[question].title,
        question_type: data[question].questionType,
        value: data[question].value,
        questionNumber: data[question].index,
        survey_id: id,
      },
    });
  }
}
