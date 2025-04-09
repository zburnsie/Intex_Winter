using System;
using System.Collections.Generic;
using Microsoft.EntityFrameworkCore;

namespace Intex.API.Models;

public partial class RecommendContext : DbContext
{
    public RecommendContext()
    {
    }

    public RecommendContext(DbContextOptions<RecommendContext> options)
        : base(options)
    {
    }

    public virtual DbSet<ContentBasedRecommendation> ContentBasedRecommendations { get; set; }

    public virtual DbSet<HybridWeightedRecommendation> HybridWeightedRecommendations { get; set; }

    public virtual DbSet<ItemToItemCollaborativeRecommendation> ItemToItemCollaborativeRecommendations { get; set; }

    public virtual DbSet<PopularityBasedRecommendation> PopularityBasedRecommendations { get; set; }

    public virtual DbSet<UserBasedCollaborativeRecommendation> UserBasedCollaborativeRecommendations { get; set; }

    protected override void OnConfiguring(DbContextOptionsBuilder optionsBuilder)

        => optionsBuilder.UseSqlite("Data Source=Database/recommendations.db;");

    protected override void OnModelCreating(ModelBuilder modelBuilder)
    {
        modelBuilder.Entity<ContentBasedRecommendation>(entity =>
        {
            entity
                .HasNoKey()
                .ToTable("content_based_recommendations");

            entity.Property(e => e.Rec1).HasColumnName("rec_1");
            entity.Property(e => e.Rec2).HasColumnName("rec_2");
            entity.Property(e => e.Rec3).HasColumnName("rec_3");
            entity.Property(e => e.Rec4).HasColumnName("rec_4");
            entity.Property(e => e.Rec5).HasColumnName("rec_5");
            entity.Property(e => e.ShowId).HasColumnName("show_id");
        });

        modelBuilder.Entity<HybridWeightedRecommendation>(entity =>
        {
            entity
                .HasNoKey()
                .ToTable("hybrid_weighted_recommendations");

            entity.Property(e => e.Rec1).HasColumnName("rec_1");
            entity.Property(e => e.Rec2).HasColumnName("rec_2");
            entity.Property(e => e.Rec3).HasColumnName("rec_3");
            entity.Property(e => e.Rec4).HasColumnName("rec_4");
            entity.Property(e => e.Rec5).HasColumnName("rec_5");
            entity.Property(e => e.ShowId).HasColumnName("show_id");
        });

        modelBuilder.Entity<ItemToItemCollaborativeRecommendation>(entity =>
        {
            entity
                .HasNoKey()
                .ToTable("item_to_item_collaborative_recommendations");

            entity.Property(e => e.BaseShowId).HasColumnName("base_show_id");
            entity.Property(e => e.Recommendation1).HasColumnName("Recommendation 1");
            entity.Property(e => e.Recommendation2).HasColumnName("Recommendation 2");
            entity.Property(e => e.Recommendation3).HasColumnName("Recommendation 3");
            entity.Property(e => e.Recommendation4).HasColumnName("Recommendation 4");
            entity.Property(e => e.Recommendation5).HasColumnName("Recommendation 5");
        });

        modelBuilder.Entity<PopularityBasedRecommendation>(entity =>
        {
            entity
                .HasNoKey()
                .ToTable("popularity_based_recommendations");

            entity.Property(e => e.ShowId).HasColumnName("show_id");
        });

        modelBuilder.Entity<UserBasedCollaborativeRecommendation>(entity =>
        {
            entity
                .HasNoKey()
                .ToTable("user_based_collaborative_recommendations");

            entity.Property(e => e.Recommendation1).HasColumnName("recommendation_1");
            entity.Property(e => e.Recommendation2).HasColumnName("recommendation_2");
            entity.Property(e => e.Recommendation3).HasColumnName("recommendation_3");
            entity.Property(e => e.Recommendation4).HasColumnName("recommendation_4");
            entity.Property(e => e.Recommendation5).HasColumnName("recommendation_5");
            entity.Property(e => e.UserId).HasColumnName("user_id");
        });

        OnModelCreatingPartial(modelBuilder);
    }

    partial void OnModelCreatingPartial(ModelBuilder modelBuilder);
}
