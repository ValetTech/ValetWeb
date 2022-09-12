CREATE TABLE [ValetAPI.Models].[Venue](
	[Id] [int] NOT NULL,
	[Name] [nvarchar](4000) NULL,
	[Address] [nvarchar](4000) NULL,
 CONSTRAINT [PK_Venue] PRIMARY KEY CLUSTERED 
(
	[Id]
)
)

-- Property 'Areas' is a list (1..* relationship), so it's been added as a secondary table
-- Property 'Sittings' is a list (1..* relationship), so it's been added as a secondary table
-- Property 'Reservations' is a list (1..* relationship), so it's been added as a secondary table