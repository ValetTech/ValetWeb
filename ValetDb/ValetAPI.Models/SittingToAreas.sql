CREATE TABLE [ValetAPI.Models].[SittingToAreas](
	[SittingId] [int] NOT NULL,
	[AreaId] [int] NOT NULL,
 CONSTRAINT [FK_SittingToAreas_Area] FOREIGN KEY([AreaId])
REFERENCES [ValetAPI.Models].[Area] ([Id]),
 CONSTRAINT [FK_SittingToAreas_Sitting] FOREIGN KEY([SittingId])
REFERENCES [ValetAPI.Models].[Sitting] ([Id])
)
