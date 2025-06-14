FROM node:21-alpine AS builder

WORKDIR /app

ARG NEXT_PUBLIC_API_HOST

# Besoin de donnée l'arguement environnement pour qu'il soit accessible dans le build (static Next.js)
ENV NEXT_PUBLIC_API_HOST=${NEXT_PUBLIC_API_HOST}


COPY package.json ./
RUN npm install

COPY prisma ./prisma/
RUN npx prisma generate

COPY . .

RUN npm run build

FROM node:21-alpine AS runner

WORKDIR /app

COPY --from=builder /app/package.json ./
RUN npm install --only=production

COPY --from=builder /app/node_modules/.prisma /app/node_modules/.prisma
COPY --from=builder /app/prisma /app/prisma
COPY --from=builder /app/.next ./.next
COPY --from=builder /app/public ./public
COPY --from=builder /app/next.config.* ./

ENV NODE_ENV=production
ENV PORT=3001
ENV NEXT_PUBLIC_API_HOST=${NEXT_PUBLIC_API_HOST}

EXPOSE 3001

CMD ["npm", "run", "start"]