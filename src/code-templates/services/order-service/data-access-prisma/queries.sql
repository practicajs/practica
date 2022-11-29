SELECT "public"."Order"."id", "public"."Order"."countryId" FROM "public"."Order" 
LEFT JOIN "public"."Country" AS "orderby_1_Country" 
ON ("Order"."countryId" = "orderby_1_Country"."id") 
ORDER BY "orderby_1_Country"."name" ASC

SELECT "public"."Country"."id", "public"."Country"."name"
FROM "public"."Country" WHERE "public"."Country"."id" IN ($1,$2,$3)

