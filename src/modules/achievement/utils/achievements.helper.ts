import { Injectable } from '@nestjs/common'

@Injectable()
export class AchievementsHelper {
  static achievements = [
    {
      name: 'Beginner',
      level: 1,
      requiredPoints: 0
    },
    {
      name: 'Student',
      level: 2,
      requiredPoints: 250
    },
    {
      name: 'Expert',
      level: 3,
      requiredPoints: 500
    },
    {
      name: 'Master',
      level: 4,
      requiredPoints: 1000
    },
    {
      name: 'Guru',
      level: 5,
      requiredPoints: 2500
    },
    {
      name: 'Thinker',
      level: 6,
      requiredPoints: 5000
    },
    {
      name: 'Sage',
      level: 7,
      requiredPoints: 10000
    },
    {
      name: 'Enlightened',
      level: 8,
      requiredPoints: 20000
    },
    {
      name: 'Oracle',
      level: 9,
      requiredPoints: 35000
    },
    {
      name: 'Genius',
      level: 10,
      requiredPoints: 50000
    },
    {
      name: 'Artificial intelligence',
      level: 11,
      requiredPoints: 75000
    },
    {
      name: 'The higher intelligence',
      level: 12,
      requiredPoints: 100000
    }
  ]

  public getAchievementByLevel(level: number) {
    return AchievementsHelper.achievements.find(item => item.level == level)
  }

  public checkDiscrepancyBigWay(userPoints: number, achievementLevel: number) {
    const nextAchievement = this.getAchievementByLevel(achievementLevel + 1)
    if (!nextAchievement) return false
    return userPoints >= nextAchievement.requiredPoints
  }
}
