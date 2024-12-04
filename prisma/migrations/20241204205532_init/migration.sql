-- CreateTable
CREATE TABLE "Owner" (
    "id" SERIAL NOT NULL,
    "email" TEXT NOT NULL,
    "givenName" TEXT,
    "surname" TEXT,

    CONSTRAINT "Owner_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "Owner_email_key" ON "Owner"("email");
