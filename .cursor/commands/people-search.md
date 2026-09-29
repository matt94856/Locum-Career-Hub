Resume the 3 people-search email-hunt workers exactly as they ran on 2026-09-29.

Workers live in `C:\Users\matt9\Desktop\PhysicianAndPractice`.
Saved launcher: `C:\Users\matt9\Desktop\PhysicianAndPractice\start-3-people-search-workers.ps1`

## Exact live command (do not change flags)

```
python -u _personal_phone_finder_agent.py --human-pace --batch-size 50 --continuous --worker N --workers 3 --priority-no-email
```

N is `0`, `1`, then `2`. Logs append to `personal_phone_research\worker_N\stdout.log`.
Set `PLAYWRIGHT_BROWSERS_PATH` to `%LOCALAPPDATA%\ms-playwright`.
Working directory must be `C:\Users\matt9\Desktop\PhysicianAndPractice`.

## When the user says continue / resume / start people search again

1. Check status first:

```powershell
cd "C:\Users\matt9\Desktop\PhysicianAndPractice"
.\start-3-people-search-workers.ps1 -Status
```

2. If the three `--workers 3` processes are already running, do **not** start duplicates. Report PIDs and stop.
3. If they are down, start **three separate Cursor terminals** (`block_until_ms: 0`) with working_directory `C:\Users\matt9\Desktop\PhysicianAndPractice`:

```powershell
.\start-3-people-search-workers.ps1 -Worker 0
```

```powershell
.\start-3-people-search-workers.ps1 -Worker 1
```

```powershell
.\start-3-people-search-workers.ps1 -Worker 2
```

4. Confirm each terminal prints `worker=0/3`, `worker=1/3`, `worker=2/3` and `PRIORITY=NO_EMAIL_ONLY`.
5. Do not fall back to `--workers 2` or `--batch-size 25`. That is the old pair, not the current hunt.

## Optional

- Stop only finder processes: `.\start-3-people-search-workers.ps1 -Stop`
- Replace running workers: `.\start-3-people-search-workers.ps1 -StopExisting`
