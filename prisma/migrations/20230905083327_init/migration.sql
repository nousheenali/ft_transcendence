-- CreateTable
CREATE TABLE "USER" (
    "ID" SERIAL NOT NULL,
    "LOGIN_ID" VARCHAR(50) NOT NULL,
    "EMAIL" VARCHAR(50) NOT NULL,
    "NAME" VARCHAR(100),
    "PROFILE_PIC" VARCHAR(255),
    "CREATED_AT" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "UPDATED_AT" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "USER_pkey" PRIMARY KEY ("ID")
);

-- CreateIndex
CREATE UNIQUE INDEX "USER_LOGIN_ID_key" ON "USER"("LOGIN_ID");

-- CreateIndex
CREATE UNIQUE INDEX "USER_EMAIL_key" ON "USER"("EMAIL");
