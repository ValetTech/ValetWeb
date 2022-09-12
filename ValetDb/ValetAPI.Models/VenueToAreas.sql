CREATE TABLE [ValetAPI.Models].[VenueToAreas](
	[VenueId] [int] NOT NULL,
	[AreaId] [int] NOT NULL,
 CONSTRAINT [FK_VenueToAreas_Area] FOREIGN KEY([AreaId])
REFERENCES [ValetAPI.Models].[Area] ([Id]),
 CONSTRAINT [FK_VenueToAreas_Venue] FOREIGN KEY([VenueId])
REFERENCES [ValetAPI.Models].[Venue] ([Id])
)
