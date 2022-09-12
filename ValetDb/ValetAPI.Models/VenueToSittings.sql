CREATE TABLE [ValetAPI.Models].[VenueToSittings](
	[VenueId] [int] NOT NULL,
	[SittingId] [int] NOT NULL,
 CONSTRAINT [FK_VenueToSittings_Sitting] FOREIGN KEY([SittingId])
REFERENCES [ValetAPI.Models].[Sitting] ([Id]),
 CONSTRAINT [FK_VenueToSittings_Venue] FOREIGN KEY([VenueId])
REFERENCES [ValetAPI.Models].[Venue] ([Id])
)
