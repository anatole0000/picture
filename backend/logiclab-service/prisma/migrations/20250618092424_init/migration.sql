-- CreateTable
CREATE TABLE "LogicExercise" (
    "id" TEXT NOT NULL,
    "title" TEXT NOT NULL,
    "question" TEXT NOT NULL,
    "options" TEXT[],
    "answer" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "LogicExercise_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "LogicSubmission" (
    "id" TEXT NOT NULL,
    "userId" TEXT NOT NULL,
    "exerciseId" TEXT NOT NULL,
    "selected" TEXT NOT NULL,
    "isCorrect" BOOLEAN NOT NULL,
    "submittedAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "LogicSubmission_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "LogicSubmission" ADD CONSTRAINT "LogicSubmission_exerciseId_fkey" FOREIGN KEY ("exerciseId") REFERENCES "LogicExercise"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
