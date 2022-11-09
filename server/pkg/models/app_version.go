package models

import (
	"chips-generator/pkg/config"
	"context"
	"log"

	"github.com/jackc/pgx/v4"
	_ "github.com/lib/pq"
)

type AppVersion struct {
	Version       string `json:"version"`
	Update_assets bool   `json:"update_assets"`
}

var (
	db *pgx.Conn
)

func init() {
	config.Connect()
	db = config.GetDB()
}

func GetAppVersion() *AppVersion {
	appV := new(AppVersion)
	query := `SELECT * FROM app_version`
	err0 := db.QueryRow(context.Background(), query).Scan(&appV.Version, &appV.Update_assets)
	if err0 != nil {
		log.Panic("Something went wrong getting latest app version: " + err0.Error())
	}
	return appV
}
