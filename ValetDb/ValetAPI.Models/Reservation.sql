CREATE TABLE [ValetAPI.Models].[Reservation](
	[Id] [int] NOT NULL,
	[CustomerId] [int] NULL,
	[Customer] [int],
	[SittingId] [int] NULL,
	[Sitting] [int],
	[DateTime] [nvarchar](max) NULL,
	[Duration] [int] NULL,
	[NoGuests] [int] NULL,
	[Source] [int],
	[Status] [int],
	[Notes] [nvarchar](4000) NULL,
 CONSTRAINT [PK_Reservation] PRIMARY KEY CLUSTERED 
(
	[Id]
),
 CONSTRAINT [FK_Reservation_Customer] FOREIGN KEY([Customer])
REFERENCES [ValetAPI.Models].[Customer] ([Id]),
 CONSTRAINT [FK_Reservation_Sitting] FOREIGN KEY([Sitting])
REFERENCES [ValetAPI.Models].[Sitting] ([Id]),
 CONSTRAINT [FK_Reservation_Source] FOREIGN KEY([Source])
REFERENCES [ValetAPI.Models].[Source] ([Id]),
 CONSTRAINT [FK_Reservation_State] FOREIGN KEY([Status])
REFERENCES [ValetAPI.Models].[State] ([Id])
)

-- Property 'Tables' is a list (1..* relationship), so it's been added as a secondary table