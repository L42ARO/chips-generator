package config

import (
	"chips-generator/pkg/utils"
	"context"
	"log"

	"github.com/jackc/pgx/v4"
)

var (
	db *pgx.Conn
)

func Connect() {
	connString := utils.GetEnvVar("DATABASE_URL")
	conn, err := pgx.Connect(context.Background(), connString)
	if err != nil {
		log.Panic(err)
	}
	db = conn
}

func GetDB() *pgx.Conn {
	return db
}
