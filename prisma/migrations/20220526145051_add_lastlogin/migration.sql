-- CreateTable
CREATE TABLE "LastLogin" (
    "userId" INTEGER NOT NULL
);

-- CreateIndex
CREATE UNIQUE INDEX "LastLogin_userId_key" ON "LastLogin"("userId");

-- AddForeignKey
ALTER TABLE "LastLogin" ADD CONSTRAINT "LastLogin_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
