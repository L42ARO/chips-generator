package main

import (
	"chips-generator/pkg/controllers"
	"fmt"
	"os"

	"github.com/gofiber/fiber/v2"
	"github.com/gofiber/fiber/v2/middleware/cors"
	"github.com/gofiber/fiber/v2/middleware/recover"
)

func main() {
	app := fiber.New()
	app.Use(recover.New())
	app.Use(cors.New())
	app.Use(cors.New(cors.Config{
		AllowOrigins: "*",
	}))
	app.Get("/app-version", controllers.HandleGetAppVersion)

	app.Listen(GetPort())
}
func GetPort() string {
	var port = os.Getenv("PORT")
	if port == "" {
		port = "8000"
		fmt.Println("Defaulting to port " + port)
	}
	return ":" + port
}
