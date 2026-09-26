-- CreateTable
CREATE TABLE "Entrega" (
    "id" SERIAL NOT NULL,
    "guia" TEXT NOT NULL,
    "destinatario" TEXT NOT NULL,
    "montoCobro" DOUBLE PRECISION NOT NULL,
    "fotoBase64" TEXT,
    "fecha" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "Entrega_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "Entrega_guia_key" ON "Entrega"("guia");
