CREATE TABLE [ValetAPI.Models].[Customer](
	[Id] [int] NOT NULL,
	[FirstName] [nvarchar](4000) NULL,
	[LastName] [nvarchar](4000) NULL,
	[Email] [nvarchar](4000) NULL,
	[Phone] [nvarchar](4000) NULL,
	[FullName] [nvarchar](4000) NULL,
 CONSTRAINT [PK_Customer] PRIMARY KEY CLUSTERED 
(
	[Id]
)
)

-- Property 'Reservations' is a list (1..* relationship), so it's been added as a secondary table